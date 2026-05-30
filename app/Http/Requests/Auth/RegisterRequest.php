<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20|unique:users,phone|regex:/^\+?[0-9]{7,15}$/',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:student,teacher',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'حقل الاسم ضروري',
            'email.required' => 'حقل البريد الإلكتروني ضروري',
            'password.required' => 'حقل كلمة المرور ضروري',
            'password.min' => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
            'password.max' => 'كلمة المرور يجب أن تكون 255 حرف على الأكثر',
            'email.unique' => 'البريد الإلكتروني موجود بالفعل',
            'email.email' => 'البريد الإلكتروني غير صحيح',
            'phone.unique' => 'الهاتف موجود بالفعل',
            'phone.regex' => 'الهاتف يجب أن يكون رقم',
            'password.confirmed' => 'كلمات المرور غير متطابقة',
            'role.required' => 'حقل الدور ضروري',
            'role.in' => 'يجب اختيار طالب أو معلم',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'الاسم',
            'email' => 'البريد الإلكتروني',
            'password' => 'كلمة المرور',
            'role' => 'الدور',
        ];
    }
}
