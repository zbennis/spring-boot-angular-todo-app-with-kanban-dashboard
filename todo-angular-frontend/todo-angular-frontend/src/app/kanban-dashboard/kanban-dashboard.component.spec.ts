import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KanbanDashboardComponent} from './kanban-dashboard.component';

describe('KanbanDashboardComponent', () => {
  let component: KanbanDashboardComponent;
  let fixture: ComponentFixture<KanbanDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
