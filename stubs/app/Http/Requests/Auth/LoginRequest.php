<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'identifier' => 'required|string|max:255',
            'password' => 'required|string',
            'remember' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'identifier.required' => 'حقل المعرف ضروري',
            'password.required' => 'حقل كلمة المرور ضروري',
            'remember.boolean' => 'حقل "تذكرني" يجب أن يكون قيمة منطقية',
            'identifier.email' => 'المعرف غير صحيح',
        ];
    }

    public function attributes(): array
    {
        return [
            'identifier' => 'المعرف',
            'password' => 'كلمة المرور',
            'remember' => 'تذكرني',
        ];
    }
}
