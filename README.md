# كورس البرمجة بالذكاء الاصطناعي

موقع احترافي لكورس البرمجة مع نظام مصادقة كامل يدعم تسجيل الدخول عبر البريد الإلكتروني و Google OAuth.

## المتطلبات

### متغيرات البيئة المطلوبة

يجب إضافة المتغيرات التالية في قسم **Vars** من الشريط الجانبي:

#### 1. DATABASE_URL (مطلوب)
\`\`\`
DATABASE_URL=postgresql://user:password@host/database
\`\`\`
- احصل عليه من Neon Database
- يمكنك استخدام الـ REST API endpoint المقدم: `https://ep-steep-firefly-ad91e4zr.apirest.c-2.us-east-1.aws.neon.tech/neondb/rest/v1`

#### 2. JWT_SECRET (مطلوب)
\`\`\`
JWT_SECRET=your-random-secret-key-here
\`\`\`
- استخدم مفتاح عشوائي طويل (32 حرف على الأقل)
- مثال: `my-super-secret-jwt-key-12345678`

#### 3. NEXT_PUBLIC_GOOGLE_CLIENT_ID (اختياري - للـ Google OAuth)
\`\`\`
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
\`\`\`
- احصل عليه من Google Cloud Console
- مطلوب فقط إذا أردت تفعيل تسجيل الدخول عبر Google

## خطوات التشغيل

### 1. إضافة متغيرات البيئة
- افتح الشريط الجانبي في v0
- اذهب إلى قسم **Vars**
- أضف المتغيرات المطلوبة أعلاه

### 2. تشغيل SQL Scripts
بعد إضافة `DATABASE_URL`، قم بتشغيل الـ scripts التالية بالترتيب:
1. `scripts/001_create_users_table.sql`
2. `scripts/002_create_course_enrollments_table.sql`

### 3. اختبار الموقع
- الصفحة الرئيسية: `/`
- تسجيل حساب جديد: `/register`
- تسجيل الدخول: `/login`
- لوحة التحكم (محمية): `/dashboard`

## المميزات

- ✅ تسجيل دخول بالبريد الإلكتروني وكلمة المرور (مشفرة)
- ✅ تسجيل دخول عبر Google OAuth
- ✅ ربط حسابات Google مع الحسابات الموجودة
- ✅ حماية الجلسات باستخدام JWT
- ✅ صفحات محمية مع Middleware
- ✅ تصميم احترافي يدعم العربية (RTL)
- ✅ لوحة تحكم للمستخدمين

## الأمان

- كلمات المرور مشفرة باستخدام bcrypt
- الجلسات محمية بـ JWT
- Cookies محمية بـ httpOnly
- Middleware للتحقق من الصلاحيات
