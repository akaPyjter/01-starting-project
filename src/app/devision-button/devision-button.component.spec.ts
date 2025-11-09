import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevisionButtonComponent } from './devision-button.component';
import { signal } from '@angular/core';

class TestHostComponent {
  isActive = true;
}

describe('DevisionButtonComponent', () => {
  let fixture: ComponentFixture<DevisionButtonComponent>;
  let component: DevisionButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisionButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevisionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input "active" undefined by default', () => {
    expect(component.active()).toBeUndefined();
  });

  it('should set input active to true', () => {
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();
    expect(component.active()).toBeTrue();
  });
});
