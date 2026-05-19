import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET, UrlSegment, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {NgIf, NgForOf} from '@angular/common';
import { filter } from 'rxjs/operators';

interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav aria-label="breadcrumb" *ngIf="breadcrumbs.length > 0" class="breadcrumbs-nav">
      <div class="breadcrumbs-container">
        <ol class="breadcrumb-list">
          <li *ngFor="let breadcrumb of breadcrumbs; let last = last; let first = first" class="breadcrumb-item" [class.active]="last">
            <!-- Separator (shown for all except first) -->
            <mat-icon class="separator-icon" *ngIf="!first">chevron_right</mat-icon>
            
            <!-- Breadcrumb Link -->
            <ng-container *ngIf="!last; else lastBreadcrumb">
              <a [routerLink]="breadcrumb.url" class="breadcrumb-link">
                <!-- Home icon for the very first step -->
                <mat-icon class="home-icon" *ngIf="first">home</mat-icon>
                <span>{{ breadcrumb.label }}</span>
              </a>
            </ng-container>
            
            <!-- Active Breadcrumb (last item) -->
            <ng-template #lastBreadcrumb>
              <span class="active-label">{{ breadcrumb.label }}</span>
            </ng-template>
          </li>
        </ol>
      </div>
    </nav>
  `,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    MatIcon
  ],
  styles: [`
    .breadcrumbs-nav {
      width: 100%;
      background-color: transparent;
      padding: 20px 24px 8px;
    }

    .breadcrumbs-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
      gap: 4px;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--gray);
    }

    .breadcrumb-link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--gray);
      text-decoration: none;
      padding: 6px 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .breadcrumb-link:hover {
      color: var(--primary);
      background-color: rgba(37, 99, 235, 0.04);
    }

    .home-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .separator-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #94a3b8; /* Slate 400 */
      margin: 0 2px;
    }

    .active-label {
      color: var(--dark);
      font-weight: 600;
      padding: 6px 8px;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadCrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Initial build on load/refresh
    this.buildBreadcrumbs();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumbs();
      });
  }

  private buildBreadcrumbs(): void {
    if (this.router.url === '/') {
      this.breadcrumbs = [];
    } else {
      this.breadcrumbs = [{label: 'Accueil', url: '/'}];
      const rootChild = this.route.root.children.find(child => child.routeConfig?.path === '');
      this.breadcrumbs = this.createBreadcrumbs(rootChild ?? this.route.root, '', this.breadcrumbs);
    }
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    if (!route) return breadcrumbs;

    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) continue;

      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}`.replace(/\/+/g, '/') : url || '/';
      const label = child.snapshot.data['breadcrumb'];

      // Ajout du breadcrumb actuel
      if (label && !breadcrumbs.find(bc => bc.url === nextUrl)) {
        breadcrumbs.push({label, url: nextUrl});
      }

      if (nextUrl.startsWith('/client') && !breadcrumbs.find(bc => bc.label === 'Profil')) {
        breadcrumbs.splice(1, 0, {label: 'Profil', url: '/profil'});
      }

      if ((nextUrl.startsWith('/retour') || nextUrl.startsWith('/retrait')) && !breadcrumbs.find(bc => bc.label === 'Profil agent')) {
        breadcrumbs.splice(1, 0, {label: 'Profil agent', url: '/agent'});
      }

      // Spécifique : si on est sur détail voiture, on veut aussi ajouter la page "Liste des voitures"
      if (nextUrl.startsWith('/voiture') && !breadcrumbs.find(bc => bc.url === '/search')) {
        breadcrumbs.splice(1, 0, {label: 'Liste des voitures', url: '/search'}); // insérer après accueil
      }

      this.createBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }
}
