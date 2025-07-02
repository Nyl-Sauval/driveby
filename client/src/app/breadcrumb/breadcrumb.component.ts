import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET, UrlSegment, RouterLink} from '@angular/router';
import { filter } from 'rxjs/operators';
import {NgForOf, NgIf} from '@angular/common';

interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav aria-label="breadcrumb" *ngIf="breadcrumbs.length > 0" class="breadcrumbs">
      <ol class="breadcrumb">
        <li *ngFor="let breadcrumb of breadcrumbs; let last = last" class="breadcrumb-item" [class.active]="last">
          <a *ngIf="!last; else lastBreadcrumb" [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
          <ng-template #lastBreadcrumb>{{ breadcrumb.label }}</ng-template>
        </li>
      </ol>
    </nav>
  `,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  styles: [`
    .breadcrumb {
      background: none;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 10px;
      list-style-type: none;
      padding: 50px 0 0 100px;
    }

    .breadcrumb-item {

      a {
        color: black;
      }

      &::before {
        content: ">";
        margin-right: 5px;
      }

      &:first-child::before {
        content: none;
      }
    }

    .breadcrumb-item.active {
      font-weight: bold;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadCrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/') {
          this.breadcrumbs = [];
        } else {
          this.breadcrumbs = [{label: 'Accueil', url: '/'}];
          const rootChild = this.route.root.children.find(child => child.routeConfig?.path === '');
          this.breadcrumbs = this.createBreadcrumbs(rootChild ?? this.route.root, '', this.breadcrumbs);
        }
      });
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
