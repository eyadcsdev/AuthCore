<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProfileRequest extends FormRequest
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
        $user = Auth::user();

        return [
            'email' => 'required|email|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20|regex:/^\+?[0-9]{7,15}$/|unique:users,phone,'.$user->id,
            'name' => 'required|string|max:255',
            'logout_from_other_devices' => 'nullable',

        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'حقل البريد الإلكتروني ضروري',
            'name.required' => 'حقل الاسم ضروري',
            'email.unique' => 'البريد الإلكتروني موجود بالفعل',
            'email.email' => 'البريد الإلكتروني غير صحيح',
            'phone.unique' => 'رقم الهاتف موجود بالفعل',
            'phone.string' => 'رقم الهاتف يجب أن يكون نصًا',
            'phone.max' => 'رقم الهاتف يجب أن يكون 20 حرفًا كحد أقصى',
            'phone.regex' => 'رقم الهاتف غير صحيح',
            'name.max' => 'الاسم يجب أن يكون 255 حرفًا كحد أقصى',
            'logout_from_other_devices.in' => 'قيمة حقل تسجيل الخروج من الأجهزة الأخرى غير صحيحة',
        ];
    }

    public function attributes(): array
    {
        return [
            'email' => 'البريد الإلكتروني',
            'name' => 'الاسم',
            'phone' => 'رقم الهاتف',
            'logout_from_other_devices' => 'تسجيل الخروج من الأجهزة الأخرى',
        ];
    }
}
