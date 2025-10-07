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
    firstNamePlaceholder: '이름을 입력해주세요',
    lastNamePlaceholder: '성을 입력해주세요',
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
    
    // Support page
    supportTitle: '도움말 및 지원',
    supportSubtitle: '궁금하신 점이 있으신가요? 언제든지 도와드리겠습니다',
    contactMethods: '연락 방법',
    onlineChat: '온라인 채팅',
    availableOnSite: '사이트에서 이용 가능',
    contactSupport: '고객지원 연락',
    myOrders: '내 주문',
    backToShopping: '쇼핑 계속하기',
    
    // Wishlist page
    wishlistTitle: '찜 목록',
    wishlistSubtitle: '좋아하는 제품을 저장하여 빠르게 액세스하세요',
    mustLogin: '로그인이 필요합니다',
    mustLoginWishlist: '찜한 제품을 보려면 계정에 로그인해야 합니다',
    toHome: '홈으로',
    wishlistEmpty: '찜 목록이 비어 있습니다',
    wishlistEmptyDesc: '제품 카드의 하트 아이콘을 클릭하여 찜 목록에 제품을 추가하세요',
    startShopping: '쇼핑 시작',
    viewProduct: '제품 보기',
    
    // Orders page
    ordersTitle: '주문 내역',
    ordersSubtitle: '이전 구매 내역 및 배송 상태 확인',
    mustLoginOrders: '주문 내역을 보려면 계정에 로그인해야 합니다',
    noOrders: '아직 주문이 없습니다',
    noOrdersDesc: '카탈로그에서 쇼핑을 시작하여 여기에서 주문 내역을 확인하세요',
    goToShopping: '쇼핑하러 가기',
    
    // Cart sidebar
    shoppingCartTitle: '장바구니',
    yourCartEmpty: '장바구니가 비어 있습니다',
    
    // Product card
    addToCartButton: '장바구니에 추가',
    pleaseLogin: '로그인해주세요',
    needLoginWishlist: '위시리스트에 추가하려면 로그인이 필요합니다',
    addedToWishlist: '위시리스트에 추가됨',
    addedToWishlistDesc: '위시리스트에 추가되었습니다',
    removedFromWishlist: '위시리스트에서 제거됨',
    removedFromWishlistDesc: '위시리스트에서 제거되었습니다',
    
    // Auth modal
    completeRecaptcha: 'reCAPTCHA 인증을 완료해주세요',
    recaptchaMissing: 'reCAPTCHA 설정이 누락되었습니다 (개발 모드)',
    passwordHint: '비밀번호는 최소 6자 이상이어야 합니다',
    
    // Checkout page
    checkoutTitle: '주문하기',
    shippingInfo: '배송 정보',
    fullName: '성명',
    fullNamePlaceholder: '이름을 입력해주세요',
    emailPlaceholder: 'example@email.com',
    shippingAddress: '배송 주소',
    addressPlaceholder: '도시, 구/군, 상세주소',
    orderSummary: '주문 내역',
    subtotal: '소계',
    tax: '부가세',
    taxIncluded: '포함',
    totalAmount: '총 결제금액',
    processing: '주문 처리 중...',
    placeOrder: '주문 확정',
    orderPlaced: '주문 완료!',
    orderPlacedDesc: '주문이 성공적으로 생성되었습니다',
    orderError: '오류',
    orderErrorDesc: '주문을 처리할 수 없습니다',
    loginToOrder: '주문하려면 로그인해주세요',
    cartEmptyCheckout: '장바구니가 비어있습니다',
    addressRequired: '주소는 최소 10글자 이상 입력해주세요',
    
    // Profile page
    manageInfo: '개인 정보 및 설정 관리',
    personalInfo: '개인 정보',
    notSpecified: '지정되지 않음',
    accountInfo: '계정 정보',
    registrationDate: '가입일',
    userId: '사용자 ID',
    firstNameRequired: '이름은 필수입니다',
    lastNameRequired: '성은 필수입니다',
    emailInvalidProfile: '유효하지 않은 이메일',
    mustLoginProfile: '로그인이 필요합니다',
    mustLoginProfileDesc: '계정 설정을 보려면 로그인해야 합니다',
    
    // Logout
    goodbye: '안녕히 가세요!',
    loggedOutSuccess: '로그아웃되었습니다',
    logoutError: '로그아웃 실패',
    logoutErrorDesc: '로그아웃할 수 없습니다'
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
    firstNamePlaceholder: 'Enter your first name',
    lastNamePlaceholder: 'Enter your last name',
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
    
    // Support page
    supportTitle: 'Help & Support',
    supportSubtitle: 'We are always ready to help you with any questions',
    contactMethods: 'Contact Methods',
    onlineChat: 'Online Chat',
    availableOnSite: 'Available on site',
    contactSupport: 'Contact Support',
    myOrders: 'My Orders',
    backToShopping: 'Back to Shopping',
    
    // Wishlist page
    wishlistTitle: 'Favorites',
    wishlistSubtitle: 'Save your favorite products for quick access',
    mustLogin: 'Login Required',
    mustLoginWishlist: 'You need to log in to your account to view favorited products',
    toHome: 'To Home',
    wishlistEmpty: 'Your wishlist is empty',
    wishlistEmptyDesc: 'Add products to favorites by clicking the heart icon on product cards',
    startShopping: 'Start Shopping',
    viewProduct: 'View Product',
    
    // Orders page
    ordersTitle: 'Order History',
    ordersSubtitle: 'View your previous purchases and shipping status',
    mustLoginOrders: 'You need to log in to your account to view order history',
    noOrders: 'You have no orders yet',
    noOrdersDesc: 'Start shopping in our catalog to see order history here',
    goToShopping: 'Go Shopping',
    
    // Cart sidebar
    shoppingCartTitle: 'Shopping Cart',
    yourCartEmpty: 'Your cart is empty',
    
    // Product card
    addToCartButton: 'ADD TO CART',
    pleaseLogin: 'Please log in',
    needLoginWishlist: 'You need to be logged in to add items to your wishlist',
    addedToWishlist: 'Added to wishlist',
    addedToWishlistDesc: 'has been added to your wishlist',
    removedFromWishlist: 'Removed from wishlist',
    removedFromWishlistDesc: 'has been removed from your wishlist',
    
    // Auth modal
    completeRecaptcha: 'Please complete the reCAPTCHA verification',
    recaptchaMissing: 'reCAPTCHA configuration missing (development mode)',
    passwordHint: 'Password must be at least 6 characters',
    
    // Checkout page
    checkoutTitle: 'Checkout',
    shippingInfo: 'Shipping Information',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your name',
    emailPlaceholder: 'example@email.com',
    shippingAddress: 'Shipping Address',
    addressPlaceholder: 'City, district, detailed address',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    tax: 'Tax',
    taxIncluded: 'Included',
    totalAmount: 'Total Amount',
    processing: 'Processing order...',
    placeOrder: 'Place Order',
    orderPlaced: 'Order Placed!',
    orderPlacedDesc: 'successfully created',
    orderError: 'Error',
    orderErrorDesc: 'Failed to process order',
    loginToOrder: 'Please log in to place an order',
    cartEmptyCheckout: 'Your cart is empty',
    addressRequired: 'Address must be at least 10 characters',
    
    // Profile page
    manageInfo: 'Manage your personal information and settings',
    personalInfo: 'Personal Information',
    notSpecified: 'Not specified',
    accountInfo: 'Account Information',
    registrationDate: 'Registration Date',
    userId: 'User ID',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    emailInvalidProfile: 'Invalid email',
    mustLoginProfile: 'Login Required',
    mustLoginProfileDesc: 'You need to log in to view account settings',
    
    // Logout
    goodbye: 'Goodbye!',
    loggedOutSuccess: 'You have been successfully logged out',
    logoutError: 'Logout Failed',
    logoutErrorDesc: 'Failed to log out'
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
    discoverOur: 'Откройте для себя коллекцию',
    essentials: '',
    
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
    firstNamePlaceholder: 'Введите ваше имя',
    lastNamePlaceholder: 'Введите вашу фамилию',
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
    
    // Support page
    supportTitle: 'Помощь и поддержка',
    supportSubtitle: 'Мы всегда готовы помочь вам с любыми вопросами',
    contactMethods: 'Способы связи',
    onlineChat: 'Онлайн-чат',
    availableOnSite: 'Доступен на сайте',
    contactSupport: 'Связаться с поддержкой',
    myOrders: 'Мои заказы',
    backToShopping: 'Вернуться к покупкам',
    
    // Wishlist page
    wishlistTitle: 'Избранное',
    wishlistSubtitle: 'Сохраняйте понравившиеся товары для быстрого доступа',
    mustLogin: 'Необходимо войти в систему',
    mustLoginWishlist: 'Для просмотра избранных товаров необходимо войти в свой аккаунт',
    toHome: 'На главную',
    wishlistEmpty: 'Ваш список избранного пуст',
    wishlistEmptyDesc: 'Добавляйте товары в избранное, нажимая на иконку сердца на карточках товаров',
    startShopping: 'Начать покупки',
    viewProduct: 'Просмотреть',
    
    // Orders page
    ordersTitle: 'История заказов',
    ordersSubtitle: 'Просматривайте свои предыдущие покупки и статус доставки',
    mustLoginOrders: 'Для просмотра истории заказов необходимо войти в свой аккаунт',
    noOrders: 'У вас пока нет заказов',
    noOrdersDesc: 'Начните покупки в нашем каталоге, чтобы увидеть историю заказов здесь',
    goToShopping: 'Перейти к покупкам',
    
    // Cart sidebar
    shoppingCartTitle: 'Корзина',
    yourCartEmpty: 'Ваша корзина пуста',
    
    // Product card
    addToCartButton: 'ДОБАВИТЬ В КОРЗИНУ',
    pleaseLogin: 'Войдите в систему',
    needLoginWishlist: 'Вам нужно войти в систему, чтобы добавлять товары в избранное',
    addedToWishlist: 'Добавлено в избранное',
    addedToWishlistDesc: 'добавлен в избранное',
    removedFromWishlist: 'Удалено из избранного',
    removedFromWishlistDesc: 'удален из избранного',
    
    // Auth modal
    completeRecaptcha: 'Пожалуйста, пройдите проверку reCAPTCHA',
    recaptchaMissing: 'Отсутствует конфигурация reCAPTCHA (режим разработки)',
    passwordHint: 'Пароль должен содержать минимум 6 символов',
    
    // Checkout page
    checkoutTitle: 'Оформление заказа',
    shippingInfo: 'Информация о доставке',
    fullName: 'Полное имя',
    fullNamePlaceholder: 'Введите ваше имя',
    emailPlaceholder: 'example@email.com',
    shippingAddress: 'Адрес доставки',
    addressPlaceholder: 'Город, район, детальный адрес',
    orderSummary: 'Детали заказа',
    subtotal: 'Подытог',
    tax: 'Налог',
    taxIncluded: 'Включен',
    totalAmount: 'Общая сумма',
    processing: 'Обработка заказа...',
    placeOrder: 'Подтвердить заказ',
    orderPlaced: 'Заказ оформлен!',
    orderPlacedDesc: 'успешно создан',
    orderError: 'Ошибка',
    orderErrorDesc: 'Не удалось обработать заказ',
    loginToOrder: 'Пожалуйста, войдите, чтобы оформить заказ',
    cartEmptyCheckout: 'Ваша корзина пуста',
    addressRequired: 'Адрес должен содержать минимум 10 символов',
    
    // Profile page
    manageInfo: 'Управляйте своей личной информацией и настройками',
    personalInfo: 'Личная информация',
    notSpecified: 'Не указано',
    accountInfo: 'Информация об аккаунте',
    registrationDate: 'Дата регистрации',
    userId: 'ID пользователя',
    firstNameRequired: 'Имя обязательно',
    lastNameRequired: 'Фамилия обязательна',
    emailInvalidProfile: 'Некорректный email',
    mustLoginProfile: 'Необходимо войти в систему',
    mustLoginProfileDesc: 'Для просмотра настроек аккаунта необходимо войти в свой аккаунт',
    
    // Logout
    goodbye: 'До свидания!',
    loggedOutSuccess: 'Вы успешно вышли из системы',
    logoutError: 'Ошибка выхода',
    logoutErrorDesc: 'Не удалось выйти из системы'
  }
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'ko' as Language,
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