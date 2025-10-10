import type { Express, Request } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { body, validationResult } from "express-validator";
import { storage } from "./storage";
import { insertCartItemSchema, loginSchema, registerSchema, insertContactMessageSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import { sendContactEmail } from "./email";

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({
      error: "Invalid input data",
      details: errors.array()
    });
  }
  next();
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY not configured');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {

  app.use((req, res, next) => {
    const allowedOrigins = [
      'http://localhost:5000',
      'http://127.0.0.1:5000',

    ];

    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  const MemoryStoreSession = MemoryStore(session);
  app.use(session({
    name: 'montero.sid',
    secret: (() => {
      const secret = process.env.SESSION_SECRET;
      if (process.env.NODE_ENV === 'production' && !secret) {
        throw new Error('SESSION_SECRET environment variable is required in production');
      }
      return secret || 'montero-dev-fallback-2024';
    })(),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new MemoryStoreSession({
      checkPeriod: 86400000
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production' && process.env.DISABLE_SECURE_COOKIE !== 'true',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/'
    }
  }));

  const requireAuth = (req: Request, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
  });

  app.post("/api/auth/register", [
    body('email')
      .isEmail()
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6, max: 128 })
      .withMessage('Пароль должен содержать минимум 6 символов'),
    body('firstName')
      .optional()
      .isLength({ max: 50 })
      .withMessage('Имя не должно превышать 50 символов'),
    body('lastName')
      .optional()
      .isLength({ max: 50 })
      .withMessage('Фамилия не должна превышать 50 символов'),
    handleValidationErrors
  ], async (req: Request, res: any) => {
    try {
      const { email, password, firstName, lastName, recaptchaToken } = req.body;

      if (recaptchaToken) {
        const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
        if (!isValidRecaptcha) {
          return res.status(400).json({ message: "reCAPTCHA verification failed" });
        }
      }

      const user = await storage.registerUser({
        email,
        password,
        confirmPassword: password,
        firstName: firstName || "User",
        lastName: lastName || "Name"
      });

      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ message: "Registration failed" });
        }

        req.session.userId = user.id;
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error("Session save error:", saveErr);
            return res.status(500).json({ message: "Registration failed" });
          }

          res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
        });
      });

    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", [
    body('email')
      .isEmail()
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage('Пожалуйста, введите корректный email адрес'),
    body('password')
      .isLength({ min: 1, max: 128 })
      .withMessage('Пароль обязателен для заполнения'),
    handleValidationErrors
  ], async (req: Request, res: any) => {
    try {
      const { email, password, recaptchaToken } = req.body;

      if (recaptchaToken) {
        const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
        if (!isValidRecaptcha) {
          return res.status(400).json({ message: "reCAPTCHA verification failed" });
        }
      }

      const user = await storage.loginUser({ email, password });

      if (!user) {
        return res.status(401).json({ message: "Неправильный логин или пароль" });
      }

      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ message: "Login failed" });
        }

        req.session.userId = user.id;
        req.session.save((saveErr) => {
          if (saveErr) {
            console.error("Session save error:", saveErr);
            return res.status(500).json({ message: "Login failed" });
          }

          res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
        });
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }

      res.clearCookie('montero.sid', {
        path: '/',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        secure: process.env.NODE_ENV === 'production'
      });
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req: Request, res) => {
    try {

      if (!req.session.userId) {
        return res.status(200).json({ user: null });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(200).json({ user: null });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string;
      const products = category
        ? await storage.getProductsByCategory(category)
        : await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems();
      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      res.json(cartWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: "Invalid cart item data" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const updatedItem = await storage.updateCartItem(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      await storage.clearCart();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  app.get("/api/wishlist", requireAuth, async (req: Request, res) => {
    try {
      const userId = req.session.userId!;
      const wishlistItems = await storage.getWishlistItems(userId);
      res.json(wishlistItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", requireAuth, async (req: Request, res) => {
    try {
      const userId = req.session.userId!;
      const { productId } = req.body;

      const wishlistItem = await storage.addToWishlist({ userId, productId });
      res.json(wishlistItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:productId", requireAuth, async (req: Request, res) => {
    try {
      const userId = req.session.userId!;
      const productId = parseInt(req.params.productId);

      await storage.removeFromWishlist(userId, productId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  app.post("/api/checkout", requireAuth, async (req: Request, res) => {
    try {
      const userId = req.session.userId!;
      const { customerEmail, customerName, shippingAddress, items } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in order" });
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(400).json({ message: `Product ${item.productId} not found` });
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price.toString()
        });
      }

      const order = await storage.createOrder({
        userId,
        status: "confirmed",
        totalAmount: totalAmount.toString(),
        customerEmail,
        customerName,
        shippingAddress
      }, orderItems.map(item => ({
        ...item,
        orderId: 0
      })));

      await storage.clearCart();

      res.json({
        message: "Order created successfully",
        order: {
          id: order.id,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders", requireAuth, async (req: Request, res) => {
    try {
      const userId = req.session.userId!;
      const orders = await storage.getUserOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req: Request, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getOrder(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const items = await storage.getOrderItems(orderId);
      res.json({ ...order, items });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/contact", [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    handleValidationErrors
  ], async (req: Request, res: any) => {
    try {
      const { name, email, subject, message } = req.body;

      const contactMessage = await storage.createContactMessage({
        name,
        email,
        subject,
        message
      });

      const emailSent = await sendContactEmail({
        name,
        email,
        subject,
        message
      });

      if (!emailSent) {

        console.warn('Contact message saved to DB but email failed to send');
        return res.status(200).json({
          success: true,
          emailSent: false,
          message: "Message saved but email notification failed. We'll contact you soon."
        });
      }

      res.json({
        success: true,
        emailSent: true,
        message: "Message received successfully"
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        emailSent: false,
        message: "Failed to send message"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
