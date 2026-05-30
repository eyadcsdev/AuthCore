<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ApproveUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role_id' => 'nullable|exists:roles,id',
        ];
    }

    public function messages(): array
    {
        return [
            'role_id.exists' => 'الدور المحدد غير موجود',
        ];
    }

    public function attributes(): array
    {
        return [
            'role_id' => 'الدور',
        ];
    }
}
