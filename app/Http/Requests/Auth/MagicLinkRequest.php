<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class MagicLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'identifier' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'identifier.required' => 'حقل البريد الإلكتروني ضروري',
        ];
    }

    public function attributes(): array
    {
        return [
            'identifier' => 'البريد الإلكتروني',
        ];
    }
}
