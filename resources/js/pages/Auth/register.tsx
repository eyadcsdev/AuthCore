import { Head, Link,useForm } from '@inertiajs/react';
import React from 'react';
import {useRoute} from  "../../../../vendor/tightenco/ziggy";
export default function Register() {
  // In a real Inertia app, you would use the useForm hook here:
  const { data, setData, post, processing, errors } = useForm({ 
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'student',
  })
  const route = useRoute();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen" dir="rtl">
      <Head title="Register" />
      
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">تسجيل حساب جديد</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">الاسم</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              autoFocus 
              value={data.name}
              onChange={(e)=>setData('name',e.target.value)}
              autoComplete="name" 
              className={`w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`} 
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">البريد الإلكتروني</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={data.email}
              onChange={(e)=>setData('email',e.target.value)}
              autoComplete="email" 
              className={`w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`} 
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium">الهاتف</label>
            <input 
              type="phone" 
              id="phone" 
              name="phone" 
              value={data.phone}
              onChange={(e)=>{
                let cleanValue = e.target.value.replace(/[^0-9+]/g, '');
                if (cleanValue.indexOf('+') > 0) {
                    cleanValue = cleanValue.charAt(0) + cleanValue.slice(1).replace(/\+/g, '');
          }
                setData('phone', cleanValue);
              }}
              autoComplete="phone" 
              className={`w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`} 
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium">الدور</label>
            <select
              id="role"
              name="role"
              value={data.role}
              onChange={(e) => setData('role', e.target.value)}
              className={`w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.role ? 'border-red-500' : ''}`}
            >
              <option value="student">طالب</option>
              <option value="teacher">معلم</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">كلمة المرور</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={data.password}
              onChange={(e)=>setData('password',e.target.value)}
              autoComplete="new-password" 
              className={`w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`} 
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">تأكيد كلمة المرور</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password" 
              value={data.password_confirmation}
              onChange={(e)=>setData('password_confirmation',e.target.value)}
              autoComplete="new-password" 
              className={`w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password_confirmation ? 'border-red-500' : ''}`} 
            />
            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={processing}
            className={`w-full py-3 mt-4 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            تسجيل
          </button>
          
          <p className="mt-4 text-sm text-center">
            هل لديك حساب بالفعل؟{' '}
            <Link href={route("login")} className="text-blue-400 hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}