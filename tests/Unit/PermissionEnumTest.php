<?php

use App\Enums\PermissionEnum;

it('has all required permission cases', function () {
    $slugs = array_map(fn ($case) => $case->value, PermissionEnum::cases());

    expect(in_array('student.view', $slugs))->toBeTrue();
    expect(in_array('student.create', $slugs))->toBeTrue();
    expect(in_array('student.edit', $slugs))->toBeTrue();
    expect(in_array('student.delete', $slugs))->toBeTrue();
    expect(in_array('teacher.view', $slugs))->toBeTrue();
    expect(in_array('course.view', $slugs))->toBeTrue();
    expect(in_array('department.view', $slugs))->toBeTrue();
    expect(in_array('user.view', $slugs))->toBeTrue();
    expect(in_array('role.view', $slugs))->toBeTrue();
    expect(in_array('dashboard.admin', $slugs))->toBeTrue();
    expect(in_array('user.approve', $slugs))->toBeTrue();
});

it('has correct group names', function () {
    expect(PermissionEnum::STUDENT_VIEW->group())->toBe('الطلاب');
    expect(PermissionEnum::TEACHER_VIEW->group())->toBe('المعلمين');
    expect(PermissionEnum::COURSE_VIEW->group())->toBe('المواد الدراسية');
    expect(PermissionEnum::DEPARTMENT_VIEW->group())->toBe('الأقسام');
    expect(PermissionEnum::USER_VIEW->group())->toBe('المستخدمين');
    expect(PermissionEnum::ROLE_VIEW->group())->toBe('الأدوار');
    expect(PermissionEnum::USER_APPROVE->group())->toBe('الموافقات');
});

it('groups permissions correctly', function () {
    $grouped = PermissionEnum::grouped();

    expect(isset($grouped['الطلاب']))->toBeTrue();
    expect(isset($grouped['المعلمين']))->toBeTrue();
    expect(count($grouped['الطلاب']))->toBe(4);
});
