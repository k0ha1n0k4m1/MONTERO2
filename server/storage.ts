import { products, cartItems, type Product, type InsertProduct, type CartItem, type InsertCartItem, users, type User, type InsertUser } from "@shared/schema";

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
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
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
    const product: Product = { ...insertProduct, id };
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
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Add new item
      const id = this.currentCartId++;
      const cartItem: CartItem = { ...insertCartItem, id };
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

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
