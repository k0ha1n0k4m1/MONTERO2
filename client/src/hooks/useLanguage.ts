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
    about: '소개',
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
    discoverOur: '우리의',
    essentials: '필수 아이템을 발견하세요',
    
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
    
    // Auth modal specific
    loginTitle: '로그인',
    registerTitle: '회원가입',
    loginSubtitle: '계정에 로그인하세요',
    registerSubtitle: '새 MONTERO 계정을 만드세요',
    loginButton: '로그인',
    registerButton: '회원가입',
    loginLoading: '로그인 중...',
    registerLoading: '가입 중...',
    noAccountRegister: '계정이 없으신가요? 회원가입',
    hasAccountLogin: '이미 계정이 있으신가요? 로그인',
    loginWelcome: '돌아오신 것을 환영합니다!',
    loginSuccessMessage: '성공적으로 로그인했습니다',
    registerWelcome: 'MONTERO에 오신 것을 환영합니다!',
    registerSuccessMessage: '계정이 성공적으로 생성되었습니다',
    loginError: '로그인 오류',
    loginErrorMessage: '로그인 정보를 확인해주세요',
    registerError: '회원가입 오류',
    registerErrorMessage: '다시 시도해주세요',
    
    // User menu
    userWelcome: '환영합니다',
    favorites: '찜 목록',
    
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
    itemLength: '제품 길이 (cm)',
    fitRecommendations: '핏 추천',
    classicFit: '클래식 핏',
    classicFitDesc: '대부분의 제품은 클래식 핏입니다. 사이즈가 애매하다면 더 편안한 착용감을 위해 큰 사이즈를 선택하세요.',
    oversizedModels: '오버사이즈 모델',
    oversizedModelsDesc: '"Oversized" 표시가 있는 제품은 평소 사이즈나 한 사이즈 작게 선택하여 원하는 효과를 얻으세요.',
    sizeHelp: '사이즈를 결정하기 어려우신가요?',
    sizeHelpDesc: '고객지원팀에 문의하시면 완벽한 핏을 찾도록 도와드립니다. 또한 편리한 교환 및 반품 정책도 제공합니다.',
    
    // Returns page
    returnsTitle: '반품 및 교환',
    returnsSubtitle: '고객 만족을 위해 최선을 다하고 있습니다. 반품 및 교환 정책을 확인해보세요.',
    returnsPolicy: '반품 정책',
    returnDays: '14일',
    returnDaysDesc: '수령 후 반품 또는 교환 가능 기간',
    freeExchange: '무료 교환',
    freeExchangeDesc: '다른 사이즈나 색상으로 교환',
    fullRefund: '전액 환불',
    fullRefundDesc: '조건 충족 시 100% 환불',
    returnProcess: '반품 절차',
    returnStep1: '신청 접수',
    returnStep1Desc: '계정을 통해 반품 신청하거나 고객지원에 문의',
    returnStep2: '상품 포장',
    returnStep2Desc: '상품을 원래 포장과 라벨과 함께 포장',
    returnStep3: '발송',
    returnStep3Desc: '택배 서비스를 이용하거나 매장에 직접 가져오기',
    returnStep4: '환불 처리',
    returnStep4Desc: '7-14 영업일 내 환불 처리',
    
    // Returnable items
    returnableItems: '반품 가능 제품',
    nonReturnableItems: '반품 불가 제품',
    clothingUndamaged: '손상되지 않은 의류',
    itemsWithTags: '라벨이 있는 제품',
    shoesInBox: '원래 포장의 신발',
    accessoryItems: '액세서리',
    underwear: '속옷',
    swimwear: '수영복',
    usedItems: '사용 흔적이 있는 제품',
    itemsWithoutTags: '라벨이 없는 제품',
    
    // Return guarantees
    thirtyDayGuarantee: '30일 보장',
    thirtyDayGuaranteeDesc: '30일 내 반품 또는 교환',
    freeExchangeService: '무료 교환',
    freeExchangeServiceDesc: '다른 사이즈나 색상으로 교환',
    fullRefundPolicy: '전액 환불',
    fullRefundPolicyDesc: '조건 충족 시 100% 환불',
    returnProcessTitle: '반품 절차',
    
    // Return conditions
    whatCanReturn: '반품 가능 제품',
    returnConditions: '반품 조건',
    itemMustBe: '제품 조건:',
    originalCondition: '원래 상태',
    withTags: '라벨 부착',
    originalPackaging: '원래 포장',
    noSigns: '사용 흔적 없음',
    returnTimelines: '반품 기간:',
    fourteenDays: '수령 후 14일',
    refundTime: '환불: 7-14 영업일',
    exchangeTime: '교환: 3-5 영업일',
    
    // FAQ section
    faqTitle: '자주 묻는 질문',
    canReturnWithoutPackaging: '포장 없이 반품할 수 있나요?',
    canReturnWithoutPackagingAnswer: '네, 하지만 제품이 라벨이 부착된 완벽한 상태여야 합니다. 최종 구매 결정까지 포장을 보관하시길 권합니다.',
    howMuchRefund: '반품 비용은 얼마인가요?',
    howMuchRefundAnswer: '제품 불량이나 주문 오류가 아닌 경우 반품 배송비는 고객 부담입니다. 10만원 이상 주문 시 사이즈 교환은 무료입니다.',
    howToGetRefund: '환불은 어떻게 받나요?',
    howToGetRefundAnswer: '환불은 원래 결제 방법과 동일한 방식으로 처리됩니다. 은행카드의 경우 환불 기간은 7-14 영업일입니다.',
    needReturnHelp: '반품 도움이 필요하신가요?',
    needReturnHelpAnswer: '저희 고객지원팀이 반품 처리를 도와드리거나 궁금한 점에 답변해드립니다.',
    contactSupport: '고객지원 연락',
    myOrders: '내 주문'
  },
  
  en: {
    // Navigation
    all: 'All',
    about: 'About',
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
    discoverOur: 'Discover our',
    essentials: 'essentials',
    
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
    
    // Auth modal specific
    loginTitle: 'Login',
    registerTitle: 'Register',
    loginSubtitle: 'Sign in to your account',
    registerSubtitle: 'Create a new MONTERO account',
    loginButton: 'Sign In',
    registerButton: 'Create Account',
    loginLoading: 'Signing in...',
    registerLoading: 'Creating account...',
    noAccountRegister: "Don't have an account? Sign up",
    hasAccountLogin: 'Already have an account? Sign in',
    loginWelcome: 'Welcome back!',
    loginSuccessMessage: 'You have successfully signed in',
    registerWelcome: 'Welcome to MONTERO!',
    registerSuccessMessage: 'Your account has been created successfully',
    loginError: 'Login Error',
    loginErrorMessage: 'Please check your credentials',
    registerError: 'Registration Error',
    registerErrorMessage: 'Please try again',
    
    // User menu
    userWelcome: 'Welcome',
    favorites: 'Favorites',
    
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
    itemLength: 'Item Length (cm)',
    fitRecommendations: 'Fit Recommendations',
    classicFit: 'Classic Fit',
    classicFitDesc: 'Most of our items have a classic fit. If you are between sizes, we recommend choosing the larger size for a more comfortable fit.',
    oversizedModels: 'Oversized Models',
    oversizedModelsDesc: 'For items marked "Oversized", we recommend choosing your usual size or even one size smaller to achieve the desired effect.',
    sizeHelp: 'Can\'t decide on size?',
    sizeHelpDesc: 'Contact our support team and we will help you choose the perfect fit. We also have a convenient exchange and return policy.',
    
    // Returns page
    returnsTitle: 'Returns & Exchange',
    returnsSubtitle: 'We strive to ensure complete satisfaction with your purchase. Learn about our return and exchange policy.',
    returnsPolicy: 'Return Policy',
    returnDays: '14 days',
    returnDaysDesc: 'For returns or exchanges from the moment of receipt',
    freeExchange: 'Free Exchange',
    freeExchangeDesc: 'Exchange items for different size or color',
    fullRefund: 'Full Refund',
    fullRefundDesc: '100% money back when conditions are met',
    returnProcess: 'Return Process',
    returnStep1: 'Submit Request',
    returnStep1Desc: 'Submit a return request through your account or contact support',
    returnStep2: 'Package Item',
    returnStep2Desc: 'Pack the item in original packaging with labels',
    returnStep3: 'Shipping',
    returnStep3Desc: 'Send via courier service or bring to store',
    returnStep4: 'Refund',
    returnStep4Desc: 'Receive refund within 7-14 business days',
    
    // Returnable items
    returnableItems: 'Returnable Items',
    nonReturnableItems: 'Non-Returnable Items',
    clothingUndamaged: 'Undamaged clothing',
    itemsWithTags: 'Items with tags',
    shoesInBox: 'Shoes in original packaging',
    accessoryItems: 'Accessories',
    underwear: 'Underwear',
    swimwear: 'Swimwear',
    usedItems: 'Items with signs of use',
    itemsWithoutTags: 'Items without tags',
    
    // Return guarantees
    thirtyDayGuarantee: '30-Day Guarantee',
    thirtyDayGuaranteeDesc: 'Return or exchange within 30 days',
    freeExchangeService: 'Free Exchange',
    freeExchangeServiceDesc: 'Exchange item for different size or color',
    fullRefundPolicy: 'Full Refund',
    fullRefundPolicyDesc: '100% refund when conditions are met',
    returnProcessTitle: 'Return Process',
    
    // Return conditions
    whatCanReturn: 'What Can Be Returned',
    returnConditions: 'Return Conditions',
    itemMustBe: 'Item must be:',
    originalCondition: 'In original condition',
    withTags: 'With attached tags',
    originalPackaging: 'In original packaging',
    noSigns: 'No signs of use',
    returnTimelines: 'Return timelines:',
    fourteenDays: '14 days from receipt',
    refundTime: 'Refund: 7-14 business days',
    exchangeTime: 'Exchange: 3-5 business days',
    
    // FAQ section
    faqTitle: 'Frequently Asked Questions',
    canReturnWithoutPackaging: 'Can I return an item without packaging?',
    canReturnWithoutPackagingAnswer: 'Yes, but the item must be in perfect condition with attached tags. We recommend keeping the packaging until you make a final decision about the purchase.',
    howMuchRefund: 'How much does a return cost?',
    howMuchRefundAnswer: 'Return shipping is at the customer\'s expense, except in cases of defects or order errors. Size exchanges are free for orders over $100.',
    howToGetRefund: 'How do I get my refund?',
    howToGetRefundAnswer: 'Refunds are processed using the same payment method used for the original purchase. For bank cards, the refund period is 7-14 business days.',
    needReturnHelp: 'Need help with returns?',
    needReturnHelpAnswer: 'Our support team is ready to help you process your return or answer any questions.',
    contactSupport: 'Contact Support',
    myOrders: 'My Orders'
  },
  
  ru: {
    // Navigation
    all: 'Все',
    about: 'О нас',
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
    discoverOur: 'Откройте для себя нашу',
    essentials: 'коллекцию',
    
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
    
    // Auth modal specific
    loginTitle: 'Вход',
    registerTitle: 'Регистрация',
    loginSubtitle: 'Войдите в свой аккаунт',
    registerSubtitle: 'Создайте новый аккаунт в MONTERO',
    loginButton: 'Войти',
    registerButton: 'Зарегистрироваться',
    loginLoading: 'Вход...',
    registerLoading: 'Регистрация...',
    noAccountRegister: 'Нет аккаунта? Зарегистрироваться',
    hasAccountLogin: 'Уже есть аккаунт? Войти',
    loginWelcome: 'Добро пожаловать!',
    loginSuccessMessage: 'Вы успешно вошли в систему',
    registerWelcome: 'Добро пожаловать в MONTERO!',
    registerSuccessMessage: 'Ваш аккаунт успешно создан',
    loginError: 'Ошибка входа',
    loginErrorMessage: 'Проверьте ваши учетные данные',
    registerError: 'Ошибка регистрации',
    registerErrorMessage: 'Попробуйте еще раз',
    
    // User menu
    userWelcome: 'Добро пожаловать',
    favorites: 'Избранное',
    
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
    itemLength: 'Длина изделия (см)',
    fitRecommendations: 'Рекомендации по посадке',
    classicFit: 'Классическая посадка',
    classicFitDesc: 'Большинство наших изделий имеют классическую посадку. Если вы находитесь между размерами, рекомендуем выбрать больший размер для более комфортной посадки.',
    oversizedModels: 'Oversized модели',
    oversizedModelsDesc: 'Для изделий с пометкой "Oversized" рекомендуем выбирать ваш обычный размер или даже на размер меньше для достижения желаемого эффекта.',
    sizeHelp: 'Не можете определиться с размером?',
    sizeHelpDesc: 'Свяжитесь с нашей службой поддержки, и мы поможем вам выбрать идеальную посадку. Также у нас действует удобная политика обмена и возврата.',
    
    // Returns page
    returnsTitle: 'Возврат и обмен',
    returnsSubtitle: 'Мы стремимся обеспечить полное удовлетворение от покупки. Ознакомьтесь с нашей политикой возврата и обмена.',
    returnsPolicy: 'Политика возврата',
    returnDays: '14 дней',
    returnDaysDesc: 'На возврат товара или обмен в течение момента получения',
    freeExchange: 'Бесплатный обмен',
    freeExchangeDesc: 'Обмен товара на другой размер или цвет',
    fullRefund: 'Полный возврат',
    fullRefundDesc: '100% возврат средств при соблюдении условий',
    returnProcess: 'Процесс возврата',
    returnStep1: 'Подача заявки',
    returnStep1Desc: 'Подайте заявку на возврат через личный кабинет или свяжитесь с поддержкой',
    returnStep2: 'Упаковка товара',
    returnStep2Desc: 'Упакуйте товар в оригинальную упаковку с ярлыками',
    returnStep3: 'Отправка',
    returnStep3Desc: 'Отправьте товар курьерской службой или принесите в магазин',
    returnStep4: 'Возврат средств',
    returnStep4Desc: 'Получите возврат средств в течение 7-14 рабочих дней',
    
    // Returnable items
    returnableItems: 'Возможен возврат',
    nonReturnableItems: 'Возврат невозможен',
    clothingUndamaged: 'Одежда без повреждений',
    itemsWithTags: 'Товары с ярлыками',
    shoesInBox: 'Обувь в оригинальной упаковке',
    accessoryItems: 'Аксессуары',
    underwear: 'Нижнее белье',
    swimwear: 'Купальники',
    usedItems: 'Товары со следами использования',
    itemsWithoutTags: 'Товары без ярлыков',
    
    // Return guarantees
    thirtyDayGuarantee: '30-дневная гарантия',
    thirtyDayGuaranteeDesc: 'Возврат или обмен в течение 30 дней',
    freeExchangeService: 'Бесплатный обмен',
    freeExchangeServiceDesc: 'Обмен товара на другой размер или цвет',
    fullRefundPolicy: 'Полный возврат',
    fullRefundPolicyDesc: '100% возврат средств при соблюдении условий',
    returnProcessTitle: 'Процесс возврата',
    
    // Return conditions
    whatCanReturn: 'Что можно вернуть',
    returnConditions: 'Условия возврата',
    itemMustBe: 'Товар должен быть:',
    originalCondition: 'В первоначальном состоянии',
    withTags: 'С прикрепленными ярлыками',
    originalPackaging: 'В оригинальной упаковке',
    noSigns: 'Без следов использования',
    returnTimelines: 'Сроки возврата:',
    fourteenDays: '14 дней с момента получения',
    refundTime: 'Возврат средств: 7-14 рабочих дней',
    exchangeTime: 'Обмен: 3-5 рабочих дней',
    
    // FAQ section
    faqTitle: 'Часто задаваемые вопросы',
    canReturnWithoutPackaging: 'Можно ли вернуть товар без упаковки?',
    canReturnWithoutPackagingAnswer: 'Да, но товар должен быть в идеальном состоянии с прикрепленными ярлыками. Мы рекомендуем сохранять упаковку до принятия окончательного решения о покупке.',
    howMuchRefund: 'Сколько стоит возврат?',
    howMuchRefundAnswer: 'Возврат товара осуществляется за счет покупателя, кроме случаев брака или ошибки в заказе. Обмен на другой размер - бесплатно при заказе от 3000₽.',
    howToGetRefund: 'Как получить возврат средств?',
    howToGetRefundAnswer: 'Средства возвращаются тем же способом, которым была произведена оплата. Для банковских карт срок возврата составляет 7-14 рабочих дней.',
    needReturnHelp: 'Нужна помощь с возвратом?',
    needReturnHelpAnswer: 'Наша служба поддержки готова помочь вам с оформлением возврата или ответить на любые вопросы.',
    contactSupport: 'Связаться с поддержкой',
    myOrders: 'Мои заказы'
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