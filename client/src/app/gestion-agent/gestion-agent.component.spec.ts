import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAgentComponent } from './gestion-agent.component';

describe('GestionAgentComponent', () => {
  let component: GestionAgentComponent;
  let fixture: ComponentFixture<GestionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
