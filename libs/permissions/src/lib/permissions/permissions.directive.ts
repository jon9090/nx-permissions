import {
  Directive,
  inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionsService } from './permissions.service';
import { Permission } from './permissions.types';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[permissions]',
  standalone: true,
})
export class PermissionsDirective implements OnInit, OnDestroy {
  private permission: Permission | null = null;
  private subscription?: Subscription;
  private hasView = false;
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private permissionsService = inject(PermissionsService);

  @Input() set permissions(permission: Permission) {
    this.permission = permission;
    this.updateView();
  }

  ngOnInit(): void {
    this.subscription = this.permissionsService
      .getPermissions$()
      .subscribe(() => {
        this.updateView();
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateView(): void {
    if (!this.permission) {
      if (this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
      return;
    }

    const hasPermission = this.permissionsService.hasPermission(
      this.permission,
    );

    if (hasPermission && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
