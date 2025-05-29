import { products, cartItems, users, orders, orderItems, type Product, type InsertProduct, type CartItem, type InsertCartItem, type User, type InsertUser, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, type LoginData, type RegisterData } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getFeaturedProducts(): Promise<Product[]>;
  
  // Cart
  getCartItems(): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  clearCart(): Promise<void>;
  
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  loginUser(loginData: LoginData): Promise<User | null>;
  registerUser(registerData: RegisterData): Promise<User>;

  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getUserOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private users: Map<number, User>;
  private currentProductId: number;
  private currentCartId: number;
  private currentUserId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.users = new Map();
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentUserId = 1;
    
    // Initialize with MONTERO products
    this.initializeProducts();
  }

  private async initializeProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "RARE Racing Tee",
        description: "Premium vintage-style racing t-shirt",
        price: 28000,
        category: "top",
        imageUrl: "@assets/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Classic Racing Hoodie",
        description: "Oversized racing hoodie with vintage graphics",
        price: 45000,
        category: "top",
        imageUrl: "@assets/IMG_1418.PNG",
        featured: 1
      },
      {
        name: "RARE Sport Tee",
        description: "Limited edition sport t-shirt",
        price: 52000,
        category: "top",
        imageUrl: "@assets/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Racing Graphics Hoodie",
        description: "Premium racing hoodie with graphic details",
        price: 89000,
        category: "top",
        imageUrl: "@assets/IMG_1418.PNG",
        featured: 1
      },
      {
        name: "Vintage Racing Tee",
        description: "Classic vintage racing design",
        price: 165000,
        category: "top",
        imageUrl: "@assets/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Premium Racing Hoodie",
        description: "High-quality racing hoodie",
        price: 78000,
        category: "top",
        imageUrl: "@assets/IMG_1418.PNG",
        featured: 1
      },
      {
        name: "RARE Collection Tee",
        description: "Exclusive RARE collection t-shirt",
        price: 125000,
        category: "top",
        imageUrl: "@assets/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Street Racing Hoodie",
        description: "Urban racing style hoodie",
        price: 68000,
        category: "top",
        imageUrl: "@assets/IMG_1418.PNG"
      },
      {
        name: "Limited RARE Tee",
        description: "Limited edition RARE racing t-shirt",
        price: 95000,
        category: "top",
        imageUrl: "@assets/IMG_1417.PNG"
      },
      {
        name: "Racing Team Hoodie",
        description: "Professional racing team hoodie",
        price: 45000,
        category: "top",
        imageUrl: "@assets/IMG_1418.PNG"
      },
      {
        name: "Vintage RARE Tee",
        description: "Retro style RARE racing t-shirt",
        price: 55000,
        category: "top",
        imageUrl: "@assets/IMG_1417.PNG"
      },
      {
        name: "Elite Racing Hoodie",
        description: "Elite level racing hoodie with premium details",
        price: 145000,
        category: "top",
        imageUrl: "@assets/IMG_1418.PNG"
      }
    ];

    for (const product of initialProducts) {
      await this.createProduct(product);
    }
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === "all") {
      return this.getProducts();
    }
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      description: insertProduct.description ?? null,
      featured: insertProduct.featured ?? null
    };
    this.products.set(id, product);
    return product;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured === 1
    );
  }

  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.productId === insertCartItem.productId
    );
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertCartItem.quantity || 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Add new item
      const id = this.currentCartId++;
      const cartItem: CartItem = { ...insertCartItem, id, quantity: insertCartItem.quantity || 1 };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async loginUser(loginData: LoginData): Promise<User | null> {
    const user = await this.getUserByEmail(loginData.email);
    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) return null;
    
    return user;
  }

  async registerUser(registerData: RegisterData): Promise<User> {
    // Check if user already exists
    const existingUser = await this.getUserByEmail(registerData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    
    // Create user
    const { confirmPassword, ...userData } = registerData;
    const userToCreate: InsertUser = {
      ...userData,
      password: hashedPassword,
    };
    
    return this.createUser(userToCreate);
  }

  // Orders (заглушки для совместимости)
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    throw new Error("Orders not implemented in MemStorage");
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    throw new Error("Orders not implemented in MemStorage");
  }

  async getOrder(id: number): Promise<Order | undefined> {
    throw new Error("Orders not implemented in MemStorage");
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    throw new Error("Orders not implemented in MemStorage");
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    throw new Error("Orders not implemented in MemStorage");
  }
}

export class DatabaseStorage implements IStorage {
  // Products
  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === "all") {
      return this.getProducts();
    }
    return db.select().from(products).where(eq(products.category, category));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.featured, 1));
  }

  // Cart
  async getCartItems(): Promise<CartItem[]> {
    return db.select().from(cartItems);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItems = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.productId, insertCartItem.productId));
    
    if (existingItems.length > 0) {
      // Update quantity
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItems[0].quantity + (insertCartItem.quantity || 1) })
        .where(eq(cartItems.id, existingItems[0].id))
        .returning();
      return updatedItem;
    } else {
      // Add new item
      const [cartItem] = await db
        .insert(cartItems)
        .values({ ...insertCartItem, quantity: insertCartItem.quantity || 1 })
        .returning();
      return cartItem;
    }
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const [item] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return item;
  }

  async clearCart(): Promise<void> {
    await db.delete(cartItems);
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async loginUser(loginData: LoginData): Promise<User | null> {
    console.log("Login attempt for:", loginData.email);
    
    const user = await this.getUserByEmail(loginData.email);
    if (!user) {
      console.log("User not found");
      return null;
    }
    
    // Simple password comparison for now
    if (user.password === loginData.password) {
      console.log("Login successful");
      return user;
    }
    
    console.log("Password mismatch");
    return null;
  }

  async registerUser(registerData: RegisterData): Promise<User> {
    const existingUser = await this.getUserByEmail(registerData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const { confirmPassword, ...userData } = registerData;
    return this.createUser(userData);
  }

  // Orders methods
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();

    // Add order items
    if (items.length > 0) {
      const orderItemsWithOrderId = items.map(item => ({
        ...item,
        orderId: newOrder.id
      }));
      
      await db
        .insert(orderItems)
        .values(orderItemsWithOrderId);
    }

    return newOrder;
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id));
    return order;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }
}

// Initialize products in database
async function initializeDatabase() {
  try {
    // Check if products already exist
    const existingProducts = await db.select().from(products);
    if (existingProducts.length > 0) {
      return; // Products already initialized
    }

    const initialProducts: InsertProduct[] = [
      {
        name: "Oversized Essential Tee",
        description: "Premium cotton oversized t-shirt with clean lines",
        price: 28000,
        category: "top",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        featured: 1
      },
      {
        name: "Classic Button Down",
        description: "Minimalist cotton button-down shirt",
        price: 45000,
        category: "top",
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        featured: 1
      },
      {
        name: "Wide Leg Trousers",
        description: "Relaxed fit wide-leg trousers in premium fabric",
        price: 52000,
        category: "bottom",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        featured: 1
      },
      {
        name: "Cashmere Pullover",
        description: "Luxurious cashmere knit pullover",
        price: 89000,
        category: "top",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        featured: 1
      },
      {
        name: "Minimal Wool Coat",
        description: "Premium wool blend coat with clean lines",
        price: 165000,
        category: "outerwear",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=750",
        featured: 1
      },
      {
        name: "Essential Midi Dress",
        description: "Effortless elegance in sustainable fabric",
        price: 78000,
        category: "top",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=750",
        featured: 1
      },
      {
        name: "Leather Sneakers",
        description: "Handcrafted premium leather sneakers",
        price: 125000,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=750",
        featured: 1
      },
      {
        name: "Minimal White Hoodie",
        description: "Clean oversized hoodie in premium cotton",
        price: 68000,
        category: "top",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a9c6dcb0041?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        name: "Straight Leg Jeans",
        description: "Classic straight-leg denim in premium wash",
        price: 95000,
        category: "bottom",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        name: "Minimalist Belt",
        description: "Italian leather belt with brushed metal buckle",
        price: 45000,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        name: "Lightweight Scarf",
        description: "Soft merino wool scarf in neutral tones",
        price: 55000,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        name: "Structured Blazer",
        description: "Tailored blazer with modern silhouette",
        price: 145000,
        category: "outerwear",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      }
    ];

    for (const product of initialProducts) {
      await db.insert(products).values(product);
    }
    
    console.log("Database initialized with products");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export const storage = new DatabaseStorage();

// Initialize database on startup
initializeDatabase();
