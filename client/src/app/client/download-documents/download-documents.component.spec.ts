import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDocumentsComponent } from './download-documents.component';

describe('DownloadDocumentsComponent', () => {
  let component: DownloadDocumentsComponent;
  let fixture: ComponentFixture<DownloadDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
