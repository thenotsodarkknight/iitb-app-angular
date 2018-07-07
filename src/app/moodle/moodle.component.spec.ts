import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodleComponent } from './moodle.component';

describe('MoodleComponent', () => {
  let component: MoodleComponent;
  let fixture: ComponentFixture<MoodleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
