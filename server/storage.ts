import { products, cartItems, users, orders, orderItems, wishlistItems, contactMessages, type Product, type InsertProduct, type CartItem, type InsertCartItem, type User, type InsertUser, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, type LoginData, type RegisterData, type WishlistItem, type InsertWishlistItem, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {

  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getFeaturedProducts(): Promise<Product[]>;

  getCartItems(): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  clearCart(): Promise<void>;

  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  loginUser(loginData: LoginData): Promise<User | null>;
  registerUser(registerData: RegisterData): Promise<User>;

  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getUserOrders(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  getWishlistItems(userId: number): Promise<WishlistItem[]>;
  addToWishlist(item: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(userId: number, productId: number): Promise<void>;
  isInWishlist(userId: number, productId: number): Promise<boolean>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
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

    this.initializeProducts();
  }

  private async initializeProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "RARE Racing Tee",
        description: "Premium vintage-style racing t-shirt",
        price: 28000,
        category: "top",
        imageUrl: "/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Classic Racing Hoodie",
        description: "Oversized racing hoodie with vintage graphics",
        price: 45000,
        category: "top",
        imageUrl: "/IMG_1418.PNG",
        featured: 1
      },
      {
        name: "RARE Sport Tee",
        description: "Limited edition sport t-shirt",
        price: 52000,
        category: "top",
        imageUrl: "/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Racing Graphics Hoodie",
        description: "Premium racing hoodie with graphic details",
        price: 89000,
        category: "top",
        imageUrl: "/IMG_1418.PNG",
        featured: 1
      },
      {
        name: "Vintage Racing Tee",
        description: "Classic vintage racing design",
        price: 165000,
        category: "top",
        imageUrl: "/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Premium Racing Hoodie",
        description: "High-quality racing hoodie",
        price: 78000,
        category: "top",
        imageUrl: "/IMG_1418.PNG",
        featured: 1
      },
      {
        name: "RARE Collection Tee",
        description: "Exclusive RARE collection t-shirt",
        price: 125000,
        category: "top",
        imageUrl: "/IMG_1417.PNG",
        featured: 1
      },
      {
        name: "Street Racing Hoodie",
        description: "Urban racing style hoodie",
        price: 68000,
        category: "top",
        imageUrl: "/IMG_1418.PNG"
      },
      {
        name: "Limited RARE Tee",
        description: "Limited edition RARE racing t-shirt",
        price: 95000,
        category: "top",
        imageUrl: "/IMG_1417.PNG"
      },
      {
        name: "Racing Team Hoodie",
        description: "Professional racing team hoodie",
        price: 45000,
        category: "top",
        imageUrl: "/IMG_1418.PNG"
      },
      {
        name: "Vintage RARE Tee",
        description: "Retro style RARE racing t-shirt",
        price: 55000,
        category: "top",
        imageUrl: "/IMG_1417.PNG"
      },
      {
        name: "Elite Racing Hoodie",
        description: "Elite level racing hoodie with premium details",
        price: 145000,
        category: "top",
        imageUrl: "/IMG_1418.PNG"
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
      featured: insertProduct.featured ?? null,
      available: insertProduct.available ?? null
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

    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.productId === insertCartItem.productId
    );

    if (existingItem) {

      existingItem.quantity += insertCartItem.quantity || 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {

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

    const existingUser = await this.getUserByEmail(registerData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const { confirmPassword, ...userData } = registerData;
    const userToCreate: InsertUser = {
      ...userData,
      password: hashedPassword,
    };

    return this.createUser(userToCreate);
  }

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

  async getWishlistItems(userId: number): Promise<WishlistItem[]> {
    throw new Error("Wishlist not implemented in MemStorage");
  }

  async addToWishlist(item: InsertWishlistItem): Promise<WishlistItem> {
    throw new Error("Wishlist not implemented in MemStorage");
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    throw new Error("Wishlist not implemented in MemStorage");
  }

  async isInWishlist(userId: number, productId: number): Promise<boolean> {
    throw new Error("Wishlist not implemented in MemStorage");
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    throw new Error("Contact messages not implemented in MemStorage");
  }
}

export class DatabaseStorage implements IStorage {

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

  async getCartItems(): Promise<CartItem[]> {
    return db.select().from(cartItems);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {

    const existingItems = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.productId, insertCartItem.productId));

    if (existingItems.length > 0) {

      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItems[0].quantity + (insertCartItem.quantity || 1) })
        .where(eq(cartItems.id, existingItems[0].id))
        .returning();
      return updatedItem;
    } else {

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

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (isPasswordValid) {
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

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const { confirmPassword, ...userData } = registerData;
    const userToCreate: InsertUser = {
      ...userData,
      password: hashedPassword,
    };

    return this.createUser(userToCreate);
  }

  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();

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

  async getWishlistItems(userId: number): Promise<WishlistItem[]> {
    return await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.userId, userId));
  }

  async addToWishlist(item: InsertWishlistItem): Promise<WishlistItem> {

    const existing = await db
      .select()
      .from(wishlistItems)
      .where(and(eq(wishlistItems.userId, item.userId), eq(wishlistItems.productId, item.productId)));

    if (existing.length > 0) {
      return existing[0];
    }

    const [newItem] = await db
      .insert(wishlistItems)
      .values(item)
      .returning();
    return newItem;
  }

  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    await db
      .delete(wishlistItems)
      .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)));
  }

  async isInWishlist(userId: number, productId: number): Promise<boolean> {
    const existing = await db
      .select()
      .from(wishlistItems)
      .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)));
    return existing.length > 0;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
}

async function initializeDatabase() {
  try {

    await db.delete(products);
    console.log("Cleared existing products");

    const initialProducts: InsertProduct[] = [
      {
        name: "Leopard Untamed hoodie White Pink",
        description: "Keeping the hood vibe alive",
        price: 0,
        category: "top",
        imageUrl: "/hoodie-white-pink.png",
        featured: 1,
        available: 0
      },
      {
        name: "Leopard Untamed hoodie Black",
        description: "Keeping the hood vibe alive",
        price: 72000,
        category: "top",
        imageUrl: "/hoodie-black-leopard.png",
        featured: 1,
        available: 1
      },
      {
        name: "Leopard Untamed hoodie White",
        description: "Keeping the hood vibe alive",
        price: 0,
        category: "top",
        imageUrl: "/hoodie-white-leopard.png",
        featured: 1,
        available: 0
      }
    ];

    for (const product of initialProducts) {
      await db.insert(products).values(product);
    }

    console.log("Database initialized with 3 new Montero hoodies");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export const storage = new DatabaseStorage();

initializeDatabase();
