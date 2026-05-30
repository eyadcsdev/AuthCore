<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:roles,slug',
            'description' => 'nullable|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'حقل الاسم مطلوب',
            'name.max' => 'الاسم يجب ألا يتجاوز 255 حرف',
            'slug.required' => 'حقل المعرف المختصر مطلوب',
            'slug.unique' => 'المعرف المختصر موجود بالفعل',
            'permissions.*.exists' => 'الصلاحية المحددة غير موجودة',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'الاسم',
            'slug' => 'المعرف المختصر',
            'description' => 'الوصف',
            'permissions' => 'الصلاحيات',
        ];
    }
}
