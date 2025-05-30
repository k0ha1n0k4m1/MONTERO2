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
    support: '지원',
    connect: '연결',
    contactUs: '문의하기',
    sizeGuide: '사이즈 가이드',
    returns: '반품/교환',
    copyright: '© 2024 MONTERO. 모든 권리 보유.',
    
    // Collection text
    collection: '컬렉션',
    
    // Product page
    backToProducts: '제품으로 돌아가기',
    productNotFound: '제품을 찾을 수 없습니다',
    productNotFoundDesc: '요청하신 제품을 찾을 수 없습니다.',
    description: '설명',
    size: '사이즈',
    quantity: '수량',
    addedToCart: '장바구니에 추가됨',
    addedToCartDesc: '이 장바구니에 추가되었습니다',
    freeShipping: '무료 배송',
    returns30Days: '30일 반품 가능',
    authenticity: '정품 보장',
    
    // Contact page
    contactTitle: '문의하기',
    contactSubtitle: '궁금한 점이 있으신가요? 편리한 방법으로 연락주세요.',
    sendMessage: '메시지 보내기',
    contactInfo: '연락처 정보',
    name: '이름',
    nameRequired: '이름을 입력해주세요',
    emailInvalid: '올바른 이메일을 입력해주세요',
    subject: '제목',
    subjectRequired: '제목을 입력해주세요',
    message: '메시지',
    messageMinLength: '메시지는 최소 10자 이상 입력해주세요',
    sendingMessage: '메시지 전송 중...',
    sendMessageBtn: '메시지 보내기',
    messageSent: '메시지가 전송되었습니다!',
    messageSentDesc: '곧 연락드리겠습니다',
    phone: '전화',
    address: '주소',
    businessHours: '운영시간',
    mondayToFriday: '월-금: 9:00 - 21:00',
    saturday: '토: 10:00 - 18:00',
    sunday: '일: 12:00 - 17:00',
    
    // Size Guide page
    sizeGuideTitle: '사이즈 가이드',
    sizeGuideSubtitle: '각 MONTERO 제품에 완벽한 핏을 찾기 위해 자세한 사이즈 차트를 활용하세요.',
    howToMeasure: '올바른 측정 방법',
    chestMeasurement: '가슴 둘레',
    chestMeasurementDesc: '가슴의 가장 높은 부분에서 줄자를 수평으로 둘러 측정하세요.',
    waistMeasurement: '허리 둘레',
    waistMeasurementDesc: '허리의 가장 좁은 부분에서 측정하며, 보통 배꼽 위쪽입니다.',
    hipMeasurement: '엉덩이 둘레',
    hipMeasurementDesc: '엉덩이의 가장 넓은 부분에서 측정하며, 보통 대퇴골 위 20cm 아래입니다.',
    sleeveMeasurement: '소매 길이',
    sleeveMeasurementDesc: '어깨에서 손목까지 팔을 살짝 굽힌 상태로 측정하세요.',
    topsAndOuterwear: '상의 및 아우터',
    bottomsAndSkirts: '바지 및 스커트',
    outerwearJackets: '아우터',
    sizeColumn: '사이즈',
    chestCircumference: '가슴 둘레 (cm)',
    waistCircumference: '허리 둘레 (cm)',
    lengthColumn: '길이 (cm)',
    hipCircumference: '엉덩이 둘레 (cm)',
    inseamLength: '안쪽 솔기 길이 (cm)',
    sleeveLength: '소매 길이 (cm)',
    itemLength: '제품 길이 (cm)'
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
    support: 'Support',
    connect: 'Connect',
    contactUs: 'Contact Us',
    sizeGuide: 'Size Guide',
    returns: 'Returns',
    copyright: '© 2024 MONTERO. All rights reserved.',
    
    // Collection text
    collection: 'Collection',
    
    // Product page
    backToProducts: 'Back to Products',
    productNotFound: 'Product Not Found',
    productNotFoundDesc: 'The product you are looking for could not be found.',
    description: 'Description',
    size: 'Size',
    quantity: 'Quantity',
    addedToCart: 'Added to Cart',
    addedToCartDesc: 'has been added to your cart',
    freeShipping: 'Free shipping',
    returns30Days: '30-day returns',
    authenticity: 'Authenticity guaranteed',
    
    // Contact page
    contactTitle: 'Contact Us',
    contactSubtitle: 'Have a question? We\'d love to help. Contact us in any convenient way.',
    sendMessage: 'Send Message',
    contactInfo: 'Contact Information',
    name: 'Name',
    nameRequired: 'Name is required',
    emailInvalid: 'Invalid email address',
    subject: 'Subject',
    subjectRequired: 'Subject is required',
    message: 'Message',
    messageMinLength: 'Message must be at least 10 characters long',
    sendingMessage: 'Sending message...',
    sendMessageBtn: 'Send Message',
    messageSent: 'Message sent!',
    messageSentDesc: 'We will contact you soon',
    phone: 'Phone',
    address: 'Address',
    businessHours: 'Business Hours',
    mondayToFriday: 'Mon-Fri: 9:00 - 21:00',
    saturday: 'Sat: 10:00 - 18:00',
    sunday: 'Sun: 12:00 - 17:00',
    
    // Size Guide page
    sizeGuideTitle: 'Size Guide',
    sizeGuideSubtitle: 'Use our detailed size charts to find the perfect fit for every MONTERO item.',
    howToMeasure: 'How to Measure Correctly',
    chestMeasurement: 'Chest Measurement',
    chestMeasurementDesc: 'Measure around the fullest part of your chest, keeping the tape horizontal and parallel to the floor.',
    waistMeasurement: 'Waist Measurement',
    waistMeasurementDesc: 'Measure at the narrowest part of your waist, usually just above the navel.',
    hipMeasurement: 'Hip Measurement',
    hipMeasurementDesc: 'Measure at the fullest part of your hips, approximately 20 cm below the waist.',
    sleeveMeasurement: 'Sleeve Length',
    sleeveMeasurementDesc: 'Measure from shoulder point to wrist with arm slightly bent.',
    topsAndOuterwear: 'Tops and Outerwear',
    bottomsAndSkirts: 'Bottoms and Skirts',
    outerwearJackets: 'Outerwear',
    sizeColumn: 'Size',
    chestCircumference: 'Chest Circumference (cm)',
    waistCircumference: 'Waist Circumference (cm)',
    lengthColumn: 'Length (cm)',
    hipCircumference: 'Hip Circumference (cm)',
    inseamLength: 'Inseam Length (cm)',
    sleeveLength: 'Sleeve Length (cm)',
    itemLength: 'Item Length (cm)'
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
    support: 'Поддержка',
    connect: 'Связаться',
    contactUs: 'Связаться с нами',
    sizeGuide: 'Размерная сетка',
    returns: 'Возврат товара',
    copyright: '© 2024 MONTERO. Все права защищены.',
    
    // Collection text
    collection: 'Коллекция',
    
    // Product page
    backToProducts: 'Вернуться к товарам',
    productNotFound: 'Товар не найден',
    productNotFoundDesc: 'Запрашиваемый товар не найден.',
    description: 'Описание',
    size: 'Размер',
    quantity: 'Количество',
    addedToCart: 'Добавлено в корзину',
    addedToCartDesc: 'добавлен в вашу корзину',
    freeShipping: 'Бесплатная доставка',
    returns30Days: 'Возврат в течение 30 дней',
    authenticity: 'Гарантия подлинности',
    
    // Contact page
    contactTitle: 'Связаться с нами',
    contactSubtitle: 'У вас есть вопросы? Мы будем рады помочь. Свяжитесь с нами любым удобным способом.',
    sendMessage: 'Отправить сообщение',
    contactInfo: 'Контактная информация',
    name: 'Имя',
    nameRequired: 'Имя обязательно',
    emailInvalid: 'Некорректный email',
    subject: 'Тема',
    subjectRequired: 'Тема обязательна',
    message: 'Сообщение',
    messageMinLength: 'Сообщение должно содержать минимум 10 символов',
    sendingMessage: 'Отправка сообщения...',
    sendMessageBtn: 'Отправить сообщение',
    messageSent: 'Сообщение отправлено!',
    messageSentDesc: 'Мы свяжемся с вами в ближайшее время',
    phone: 'Телефон',
    address: 'Адрес',
    businessHours: 'Часы работы',
    mondayToFriday: 'Пн-Пт: 9:00 - 21:00',
    saturday: 'Сб: 10:00 - 18:00',
    sunday: 'Вс: 12:00 - 17:00',
    
    // Size Guide page
    sizeGuideTitle: 'Таблица размеров',
    sizeGuideSubtitle: 'Используйте наши подробные таблицы размеров, чтобы найти идеальную посадку для каждого изделия MONTERO.',
    howToMeasure: 'Как правильно снять мерки',
    chestMeasurement: 'Обхват груди',
    chestMeasurementDesc: 'Измерьте обхват груди по самой выступающей части, держа сантиметровую ленту параллельно полу.',
    waistMeasurement: 'Обхват талии',
    waistMeasurementDesc: 'Измерьте в самой узкой части талии, обычно чуть выше пупка.',
    hipMeasurement: 'Длина рукава',
    hipMeasurementDesc: 'Измерьте от плечевой точки до запястья при слегка согнутой руке.',
    sleeveMeasurement: 'Обхват бедер',
    sleeveMeasurementDesc: 'Измерьте по самой широкой части бедер, примерно на 20 см ниже талии.',
    topsAndOuterwear: 'Верхняя одежда и топы',
    bottomsAndSkirts: 'Брюки и юбки',
    outerwearJackets: 'Верхняя одежда',
    sizeColumn: 'Размер',
    chestCircumference: 'Обхват груди (см)',
    waistCircumference: 'Обхват талии (см)',
    lengthColumn: 'Длина (см)',
    hipCircumference: 'Обхват бедер (см)',
    inseamLength: 'Длина по внутр. шву (см)',
    sleeveLength: 'Длина рукава (см)',
    itemLength: 'Длина изделия (см)'
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