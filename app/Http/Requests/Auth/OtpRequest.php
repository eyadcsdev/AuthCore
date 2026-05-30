<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class OtpRequest extends FormRequest
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
            'otp' => 'required|array|size:6',
            'otp.*' => 'required|numeric|digits:1',
        ];
    }

    public function messages(): array
    {
        return [
            'identifier.required' => 'حقل البريد الإلكتروني ضروري',
            'otp.required' => 'حقل رمز التحقق ضروري',
            'otp.array' => 'حقل رمز التحقق يجب أن يكون مصفوفة',
            'otp.size' => 'حقل رمز التحقق يجب أن يحتوي على 6 خانات',
            'otp.*.required' => 'كل خانة من رمز التحقق ضرورية',
            'otp.*.numeric' => 'كل خانة من رمز التحقق يجب أن تكون رقمًا',
            'otp.*.digits' => 'كل خانة من رمز التحقق يجب أن تكون رقمًا واحدًا',
        ];
    }

    public function attributes(): array
    {
        return [
            'identifier' => 'البريد الإلكتروني',
            'otp' => 'رمز التحقق',
        ];
    }
}
