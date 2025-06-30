import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLocationsComponent } from './liste-locations.component';

describe('ListeLocationsComponent', () => {
  let component: ListeLocationsComponent;
  let fixture: ComponentFixture<ListeLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeLocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
