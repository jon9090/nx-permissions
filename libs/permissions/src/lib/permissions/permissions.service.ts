import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Permission } from './permissions.types';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private permissions$ = new BehaviorSubject<Set<Permission>>(new Set());

  setPermissions(permissions: Permission[]): void {
    this.permissions$.next(new Set(permissions));
  }

  hasPermission(permission: Permission): boolean {
    return this.permissions$.value.has(permission);
  }

  getPermissions$(): Observable<Set<Permission>> {
    return this.permissions$.asObservable();
  }

  addPermission(permission: Permission): void {
    const current = new Set(this.permissions$.value);
    current.add(permission);
    this.permissions$.next(current);
  }

  removePermission(permission: Permission): void {
    const current = new Set(this.permissions$.value);
    current.delete(permission);
    this.permissions$.next(current);
  }
}

