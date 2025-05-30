import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'ko' | 'en' | 'ru'

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Переводы
const translations = {
  ko: {
    // Navigation
    all: '전체',
    outerwear: '아우터',
    top: '상의',
    bottom: '하의',
    best: '베스트',
    accessories: '액세서리',
    
    // Header actions
    search: '검색',
    account: '계정',
    cart: '장바구니',
    
    // Hero section
    heroTitle: '(MonTero)',
    exploreCollection: '컬렉션 둘러보기',
    
    // Product sections
    newArrivals: '신상품',
    freshPieces: '이번 시즌 새로운 아이템',
    featuredSelection: '추천 상품',
    handpicked: '엄선된 스타일',
    
    // Product info
    price: '가격',
    addToCart: '장바구니 담기',
    
    // Cart
    shoppingCart: '장바구니',
    cartEmpty: '장바구니가 비어있습니다',
    continueShopping: '계속 쇼핑하기',
    items: '상품',
    shipping: '배송비',
    free: '무료',
    total: '총합',
    checkout: '결제하기',
    clearCart: '장바구니 비우기',
    
    // Auth
    login: '로그인',
    register: '회원가입',
    logout: '로그아웃',
    email: '이메일',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    firstName: '이름',
    lastName: '성',
    welcome: '환영합니다!',
    loginSuccess: '성공적으로 로그인했습니다',
    welcomeToMontero: 'MONTERO에 오신 것을 환영합니다!',
    accountCreated: '계정이 성공적으로 생성되었습니다',
    
    // Footer
    newsletter: '뉴스레터',
    stayUpdated: '최신 컬렉션과 독점 혜택을 받아보세요',
    subscribeNewsletter: '뉴스레터 구독',
    enterEmail: '이메일을 입력하세요',
    subscribe: '구독하기',
    
    // Menu items
    orderHistory: '주문 내역',
    wishlist: '위시리스트',
    accountSettings: '계정 설정',
    helpSupport: '도움말 및 지원',
    
    // Language selector
    language: '언어',
    korean: '한국어',
    english: 'English',
    russian: 'Русский',
    
    // Newsletter
    subscribing: '구독 중...',
    subscribed: '구독해 주셔서 감사합니다!',
    
    // Footer
    brandDescription: '현대인을 위한 울트라 미니멀리즘 패션',
    allProducts: '모든 제품',
    sale: '세일',
    connect: '연결',
    contactUs: '문의하기',
    sizeGuide: '사이즈 가이드',
    returns: '반품/교환',
    copyright: '© 2024 MONTERO. 모든 권리 보유.',
    
    // Collection text
    collection: '컬렉션'
  },
  
  en: {
    // Navigation
    all: 'All',
    outerwear: 'Outerwear',
    top: 'Top',
    bottom: 'Bottom',
    best: 'Best',
    accessories: 'Accessories',
    
    // Header actions
    search: 'Search',
    account: 'Account',
    cart: 'Cart',
    
    // Hero section
    heroTitle: '(MonTero)',
    exploreCollection: 'EXPLORE COLLECTION',
    
    // Product sections
    newArrivals: 'New Arrivals',
    freshPieces: 'Fresh pieces for the season',
    featuredSelection: 'Featured Selection',
    handpicked: 'Handpicked styles for you',
    
    // Product info
    price: 'Price',
    addToCart: 'Add to Cart',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    items: 'Items',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    clearCart: 'Clear Cart',
    
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    welcome: 'Welcome!',
    loginSuccess: 'Successfully logged in',
    welcomeToMontero: 'Welcome to MONTERO!',
    accountCreated: 'Your account has been created successfully',
    
    // Footer
    newsletter: 'Newsletter',
    stayUpdated: 'Stay updated with our latest collections and exclusive offers',
    subscribeNewsletter: 'Subscribe to Newsletter',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    
    // Menu items
    orderHistory: 'Order History',
    wishlist: 'Wishlist',
    accountSettings: 'Account Settings',
    helpSupport: 'Help & Support',
    
    // Language selector
    language: 'Language',
    korean: '한국어',
    english: 'English',
    russian: 'Русский',
    
    // Newsletter
    subscribing: 'Subscribing...',
    subscribed: 'Thank you for subscribing!',
    
    // Footer
    brandDescription: 'Ultra-minimalist fashion for the modern individual',
    allProducts: 'All Products',
    sale: 'Sale',
    connect: 'Connect',
    contactUs: 'Contact Us',
    sizeGuide: 'Size Guide',
    returns: 'Returns',
    copyright: '© 2024 MONTERO. All rights reserved.',
    
    // Collection text
    collection: 'Collection'
  },
  
  ru: {
    // Navigation
    all: 'Все',
    outerwear: 'Верхняя одежда',
    top: 'Верх',
    bottom: 'Низ',
    best: 'Лучшее',
    accessories: 'Аксессуары',
    
    // Header actions
    search: 'Поиск',
    account: 'Аккаунт',
    cart: 'Корзина',
    
    // Hero section
    heroTitle: '(MonTero)',
    exploreCollection: 'ИЗУЧИТЬ КОЛЛЕКЦИЮ',
    
    // Product sections
    newArrivals: 'Новинки',
    freshPieces: 'Свежие образы сезона',
    featuredSelection: 'Рекомендуемое',
    handpicked: 'Отобранные для вас стили',
    
    // Product info
    price: 'Цена',
    addToCart: 'В корзину',
    
    // Cart
    shoppingCart: 'Корзина',
    cartEmpty: 'Ваша корзина пуста',
    continueShopping: 'Продолжить покупки',
    items: 'Товаров',
    shipping: 'Доставка',
    free: 'Бесплатно',
    total: 'Итого',
    checkout: 'Оформить заказ',
    clearCart: 'Очистить корзину',
    
    // Auth
    login: 'Вход',
    register: 'Регистрация',
    logout: 'Выйти',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Подтвердить пароль',
    firstName: 'Имя',
    lastName: 'Фамилия',
    welcome: 'Добро пожаловать!',
    loginSuccess: 'Вы успешно вошли в систему',
    welcomeToMontero: 'Добро пожаловать в MONTERO!',
    accountCreated: 'Ваш аккаунт успешно создан',
    
    // Footer
    newsletter: 'Рассылка',
    stayUpdated: 'Будьте в курсе наших последних коллекций и эксклюзивных предложений',
    subscribeNewsletter: 'Подписаться на рассылку',
    enterEmail: 'Введите ваш email',
    subscribe: 'Подписаться',
    
    // Menu items
    orderHistory: 'История заказов',
    wishlist: 'Избранное',
    accountSettings: 'Настройки аккаунта',
    helpSupport: 'Помощь и поддержка',
    
    // Language selector
    language: 'Язык',
    korean: '한국어',
    english: 'English',
    russian: 'Русский',
    
    // Newsletter
    subscribing: 'Подписываемся...',
    subscribed: 'Спасибо за подписку!',
    
    // Footer
    brandDescription: 'Ультра-минималистичная мода для современного человека',
    allProducts: 'Все товары',
    sale: 'Распродажа',
    connect: 'Связаться',
    contactUs: 'Связаться с нами',
    sizeGuide: 'Размерная сетка',
    returns: 'Возврат товара',
    copyright: '© 2024 MONTERO. Все права защищены.',
    
    // Collection text
    collection: 'Коллекция'
  }
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ru' as Language,
      setLanguage: (language: Language) => set({ language }),
      t: (key: string) => {
        const { language } = get()
        return translations[language][key as keyof typeof translations[typeof language]] || key
      }
    }),
    {
      name: 'montero-language'
    }
  )
)