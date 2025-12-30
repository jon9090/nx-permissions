import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  PermissionsDirective,
  PermissionsService,
  Permission,
} from '@nx-permissions/permissions';

@Component({
  imports: [RouterModule, PermissionsDirective],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'nx-permissions';

  private permissionsService = inject(PermissionsService);

  ngOnInit(): void {
    const permissions: Permission[] = ['ALLOW_X'];
    this.permissionsService.setPermissions(permissions);
  }
}
