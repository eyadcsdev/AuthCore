<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
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
            'current_password' => 'required|current_password:web',
            'password' => 'required|confirmed|min:8',
            'password_confirmation' => 'required|same:password',
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.required' => 'حقل كلمة المرور الحالية ضروري',
            'password.required' => 'حقل كلمة المرور الجديدة ضروري',
            'password_confirmation.required' => 'حقل تأكيد كلمة المرور الجديدة ضروري',
            'password.confirmed' => 'كلمة المرور الجديدة وتأكيدها غير متطابقين',
            'password.min' => 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل',
            'current_password.current_password' => 'كلمة المرور الحالية غير صحيحة',
        ];
    }

    public function attributes(): array
    {
        return [
            'current_password' => 'كلمة المرور الحالية',
            'password' => 'كلمة المرور الجديدة',
            'password_confirmation' => 'تأكيد كلمة المرور الجديدة',
        ];
    }
}
