import { ComponentFixture, TestBed } from '@angular/core/testing';

import {json1component} from './json-1.component';

describe('json-1component', () => {
  let component: json1component;
  let fixture: ComponentFixture<json1component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [json1component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(json1component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
