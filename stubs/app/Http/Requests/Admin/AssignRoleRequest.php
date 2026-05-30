<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AssignRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
        ];
    }

    public function messages(): array
    {
        return [
            'roles.required' => 'حقل الأدوار مطلوب',
            'roles.*.exists' => 'الدور المحدد غير موجود',
        ];
    }

    public function attributes(): array
    {
        return [
            'roles' => 'الأدوار',
        ];
    }
}
