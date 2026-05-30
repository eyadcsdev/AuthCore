<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // Student permissions
    case STUDENT_VIEW = 'student.view';
    case STUDENT_CREATE = 'student.create';
    case STUDENT_EDIT = 'student.edit';
    case STUDENT_DELETE = 'student.delete';

    // Teacher permissions
    case TEACHER_VIEW = 'teacher.view';
    case TEACHER_CREATE = 'teacher.create';
    case TEACHER_EDIT = 'teacher.edit';
    case TEACHER_DELETE = 'teacher.delete';

    // Course permissions
    case COURSE_VIEW = 'course.view';
    case COURSE_CREATE = 'course.create';
    case COURSE_EDIT = 'course.edit';
    case COURSE_DELETE = 'course.delete';

    // Department permissions
    case DEPARTMENT_VIEW = 'department.view';
    case DEPARTMENT_CREATE = 'department.create';
    case DEPARTMENT_EDIT = 'department.edit';
    case DEPARTMENT_DELETE = 'department.delete';

    // User permissions
    case USER_VIEW = 'user.view';
    case USER_CREATE = 'user.create';
    case USER_EDIT = 'user.edit';
    case USER_DELETE = 'user.delete';

    // Role permissions
    case ROLE_VIEW = 'role.view';
    case ROLE_CREATE = 'role.create';
    case ROLE_EDIT = 'role.edit';
    case ROLE_DELETE = 'role.delete';

    // Dashboard permissions
    case DASHBOARD_ADMIN = 'dashboard.admin';
    case DASHBOARD_STUDENT = 'dashboard.student';
    case DASHBOARD_TEACHER = 'dashboard.teacher';
    case DASHBOARD_DEPARTMENT = 'dashboard.department';

    // Approval permissions
    case USER_APPROVE = 'user.approve';
    case USER_REJECT = 'user.reject';
    case USER_SUSPEND = 'user.suspend';

    public function group(): string
    {
        return match ($this) {
            self::STUDENT_VIEW, self::STUDENT_CREATE, self::STUDENT_EDIT, self::STUDENT_DELETE => 'الطلاب',
            self::TEACHER_VIEW, self::TEACHER_CREATE, self::TEACHER_EDIT, self::TEACHER_DELETE => 'المعلمين',
            self::COURSE_VIEW, self::COURSE_CREATE, self::COURSE_EDIT, self::COURSE_DELETE => 'المواد الدراسية',
            self::DEPARTMENT_VIEW, self::DEPARTMENT_CREATE, self::DEPARTMENT_EDIT, self::DEPARTMENT_DELETE => 'الأقسام',
            self::USER_VIEW, self::USER_CREATE, self::USER_EDIT, self::USER_DELETE => 'المستخدمين',
            self::ROLE_VIEW, self::ROLE_CREATE, self::ROLE_EDIT, self::ROLE_DELETE => 'الأدوار',
            self::DASHBOARD_ADMIN, self::DASHBOARD_STUDENT, self::DASHBOARD_TEACHER, self::DASHBOARD_DEPARTMENT => 'لوحات التحكم',
            self::USER_APPROVE, self::USER_REJECT, self::USER_SUSPEND => 'الموافقات',
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::STUDENT_VIEW => 'عرض الطلاب',
            self::STUDENT_CREATE => 'إضافة طالب',
            self::STUDENT_EDIT => 'تعديل الطالب',
            self::STUDENT_DELETE => 'حذف الطالب',
            self::TEACHER_VIEW => 'عرض المعلمين',
            self::TEACHER_CREATE => 'إضافة معلم',
            self::TEACHER_EDIT => 'تعديل المعلم',
            self::TEACHER_DELETE => 'حذف المعلم',
            self::COURSE_VIEW => 'عرض المواد',
            self::COURSE_CREATE => 'إضافة مادة',
            self::COURSE_EDIT => 'تعديل المادة',
            self::COURSE_DELETE => 'حذف المادة',
            self::DEPARTMENT_VIEW => 'عرض الأقسام',
            self::DEPARTMENT_CREATE => 'إضافة قسم',
            self::DEPARTMENT_EDIT => 'تعديل القسم',
            self::DEPARTMENT_DELETE => 'حذف القسم',
            self::USER_VIEW => 'عرض المستخدمين',
            self::USER_CREATE => 'إضافة مستخدم',
            self::USER_EDIT => 'تعديل المستخدم',
            self::USER_DELETE => 'حذف المستخدم',
            self::ROLE_VIEW => 'عرض الأدوار',
            self::ROLE_CREATE => 'إضافة دور',
            self::ROLE_EDIT => 'تعديل الدور',
            self::ROLE_DELETE => 'حذف الدور',
            self::DASHBOARD_ADMIN => 'لوحة تحكم المشرف',
            self::DASHBOARD_STUDENT => 'لوحة تحكم الطالب',
            self::DASHBOARD_TEACHER => 'لوحة تحكم المعلم',
            self::DASHBOARD_DEPARTMENT => 'لوحة تحكم القسم',
            self::USER_APPROVE => 'الموافقة على المستخدمين',
            self::USER_REJECT => 'رفض المستخدمين',
            self::USER_SUSPEND => 'تعليق المستخدمين',
        };
    }

    public static function grouped(): array
    {
        $groups = [];

        foreach (self::cases() as $permission) {
            $group = $permission->group();
            $groups[$group][] = [
                'slug' => $permission->value,
                'name' => $permission->label(),
            ];
        }

        return $groups;
    }
}
