window.HR_DATA = {
  "source": "Nothing0g/hr_employee_attrition_analysis/HR_Employee_Attrition.csv",
  "generatedFrom": "Original repository CSV; cleaned with the same constant-column removal and target mapping as HR_Employee_Attrition_Analysis.py",
  "overall": {
    "headcount": 1470,
    "leavers": 237,
    "attritionRate": 16.1,
    "overtimeRate": 30.5,
    "nonOvertimeRate": 10.4,
    "medianIncomeLeavers": 3202,
    "medianIncomeStayers": 5204,
    "medianTenureLeavers": 3.0,
    "medianTenureStayers": 6.0
  },
  "overtime": [
    {
      "label": "Yes",
      "headcount": 416,
      "leavers": 127,
      "rate": 30.5
    },
    {
      "label": "No",
      "headcount": 1054,
      "leavers": 110,
      "rate": 10.4
    }
  ],
  "departments": [
    {
      "label": "Sales",
      "headcount": 446,
      "leavers": 92,
      "rate": 20.6
    },
    {
      "label": "Human Resources",
      "headcount": 63,
      "leavers": 12,
      "rate": 19.0
    },
    {
      "label": "Research & Development",
      "headcount": 961,
      "leavers": 133,
      "rate": 13.8
    }
  ],
  "roles": [
    {
      "label": "Sales Representative",
      "headcount": 83,
      "leavers": 33,
      "rate": 39.8
    },
    {
      "label": "Laboratory Technician",
      "headcount": 259,
      "leavers": 62,
      "rate": 23.9
    },
    {
      "label": "Human Resources",
      "headcount": 52,
      "leavers": 12,
      "rate": 23.1
    },
    {
      "label": "Sales Executive",
      "headcount": 326,
      "leavers": 57,
      "rate": 17.5
    },
    {
      "label": "Research Scientist",
      "headcount": 292,
      "leavers": 47,
      "rate": 16.1
    },
    {
      "label": "Manufacturing Director",
      "headcount": 145,
      "leavers": 10,
      "rate": 6.9
    },
    {
      "label": "Healthcare Representative",
      "headcount": 131,
      "leavers": 9,
      "rate": 6.9
    },
    {
      "label": "Manager",
      "headcount": 102,
      "leavers": 5,
      "rate": 4.9
    },
    {
      "label": "Research Director",
      "headcount": 80,
      "leavers": 2,
      "rate": 2.5
    }
  ],
  "tenure": [
    {
      "label": "0\u20132 yrs",
      "headcount": 215,
      "leavers": 75,
      "rate": 34.9
    },
    {
      "label": "2\u20135 yrs",
      "headcount": 365,
      "leavers": 66,
      "rate": 18.1
    },
    {
      "label": "5\u201310 yrs",
      "headcount": 524,
      "leavers": 58,
      "rate": 11.1
    },
    {
      "label": "10+ yrs",
      "headcount": 366,
      "leavers": 38,
      "rate": 10.4
    }
  ],
  "income": [
    {
      "label": "< \u20b93k",
      "headcount": 395,
      "leavers": 113,
      "rate": 28.6
    },
    {
      "label": "\u20b93k\u20136k",
      "headcount": 519,
      "leavers": 66,
      "rate": 12.7
    },
    {
      "label": "\u20b96k\u201310k",
      "headcount": 275,
      "leavers": 33,
      "rate": 12.0
    },
    {
      "label": "\u20b910k+",
      "headcount": 281,
      "leavers": 25,
      "rate": 8.9
    }
  ],
  "segmentViews": {
    "departmentOvertime": [
      {
        "Department": "Human Resources",
        "OverTime": "No",
        "headcount": 46,
        "leavers": 7,
        "rate": 15.2
      },
      {
        "Department": "Human Resources",
        "OverTime": "Yes",
        "headcount": 17,
        "leavers": 5,
        "rate": 29.4
      },
      {
        "Department": "Research & Development",
        "OverTime": "No",
        "headcount": 690,
        "leavers": 59,
        "rate": 8.6
      },
      {
        "Department": "Research & Development",
        "OverTime": "Yes",
        "headcount": 271,
        "leavers": 74,
        "rate": 27.3
      },
      {
        "Department": "Sales",
        "OverTime": "No",
        "headcount": 318,
        "leavers": 44,
        "rate": 13.8
      },
      {
        "Department": "Sales",
        "OverTime": "Yes",
        "headcount": 128,
        "leavers": 48,
        "rate": 37.5
      }
    ],
    "roleOvertime": [
      {
        "JobRole": "Healthcare Representative",
        "OverTime": "No",
        "headcount": 94,
        "leavers": 7,
        "rate": 7.4
      },
      {
        "JobRole": "Healthcare Representative",
        "OverTime": "Yes",
        "headcount": 37,
        "leavers": 2,
        "rate": 5.4
      },
      {
        "JobRole": "Human Resources",
        "OverTime": "No",
        "headcount": 39,
        "leavers": 7,
        "rate": 17.9
      },
      {
        "JobRole": "Human Resources",
        "OverTime": "Yes",
        "headcount": 13,
        "leavers": 5,
        "rate": 38.5
      },
      {
        "JobRole": "Laboratory Technician",
        "OverTime": "No",
        "headcount": 197,
        "leavers": 31,
        "rate": 15.7
      },
      {
        "JobRole": "Laboratory Technician",
        "OverTime": "Yes",
        "headcount": 62,
        "leavers": 31,
        "rate": 50.0
      },
      {
        "JobRole": "Manager",
        "OverTime": "No",
        "headcount": 75,
        "leavers": 1,
        "rate": 1.3
      },
      {
        "JobRole": "Manager",
        "OverTime": "Yes",
        "headcount": 27,
        "leavers": 4,
        "rate": 14.8
      },
      {
        "JobRole": "Manufacturing Director",
        "OverTime": "No",
        "headcount": 106,
        "leavers": 6,
        "rate": 5.7
      },
      {
        "JobRole": "Manufacturing Director",
        "OverTime": "Yes",
        "headcount": 39,
        "leavers": 4,
        "rate": 10.3
      },
      {
        "JobRole": "Research Director",
        "OverTime": "No",
        "headcount": 57,
        "leavers": 1,
        "rate": 1.8
      },
      {
        "JobRole": "Research Director",
        "OverTime": "Yes",
        "headcount": 23,
        "leavers": 1,
        "rate": 4.3
      },
      {
        "JobRole": "Research Scientist",
        "OverTime": "No",
        "headcount": 195,
        "leavers": 14,
        "rate": 7.2
      },
      {
        "JobRole": "Research Scientist",
        "OverTime": "Yes",
        "headcount": 97,
        "leavers": 33,
        "rate": 34.0
      },
      {
        "JobRole": "Sales Executive",
        "OverTime": "No",
        "headcount": 232,
        "leavers": 26,
        "rate": 11.2
      },
      {
        "JobRole": "Sales Executive",
        "OverTime": "Yes",
        "headcount": 94,
        "leavers": 31,
        "rate": 33.0
      },
      {
        "JobRole": "Sales Representative",
        "OverTime": "No",
        "headcount": 59,
        "leavers": 17,
        "rate": 28.8
      },
      {
        "JobRole": "Sales Representative",
        "OverTime": "Yes",
        "headcount": 24,
        "leavers": 16,
        "rate": 66.7
      }
    ],
    "departmentRole": [
      {
        "Department": "Human Resources",
        "JobRole": "Human Resources",
        "headcount": 52,
        "leavers": 12,
        "rate": 23.1
      },
      {
        "Department": "Human Resources",
        "JobRole": "Manager",
        "headcount": 11,
        "leavers": 0,
        "rate": 0.0
      },
      {
        "Department": "Research & Development",
        "JobRole": "Healthcare Representative",
        "headcount": 131,
        "leavers": 9,
        "rate": 6.9
      },
      {
        "Department": "Research & Development",
        "JobRole": "Laboratory Technician",
        "headcount": 259,
        "leavers": 62,
        "rate": 23.9
      },
      {
        "Department": "Research & Development",
        "JobRole": "Manager",
        "headcount": 54,
        "leavers": 3,
        "rate": 5.6
      },
      {
        "Department": "Research & Development",
        "JobRole": "Manufacturing Director",
        "headcount": 145,
        "leavers": 10,
        "rate": 6.9
      },
      {
        "Department": "Research & Development",
        "JobRole": "Research Director",
        "headcount": 80,
        "leavers": 2,
        "rate": 2.5
      },
      {
        "Department": "Research & Development",
        "JobRole": "Research Scientist",
        "headcount": 292,
        "leavers": 47,
        "rate": 16.1
      },
      {
        "Department": "Sales",
        "JobRole": "Manager",
        "headcount": 37,
        "leavers": 2,
        "rate": 5.4
      },
      {
        "Department": "Sales",
        "JobRole": "Sales Executive",
        "headcount": 326,
        "leavers": 57,
        "rate": 17.5
      },
      {
        "Department": "Sales",
        "JobRole": "Sales Representative",
        "headcount": 83,
        "leavers": 33,
        "rate": 39.8
      }
    ],
    "departmentRoleOvertime": [
      {
        "Department": "Human Resources",
        "JobRole": "Human Resources",
        "OverTime": "No",
        "headcount": 39,
        "leavers": 7,
        "rate": 17.9
      },
      {
        "Department": "Human Resources",
        "JobRole": "Human Resources",
        "OverTime": "Yes",
        "headcount": 13,
        "leavers": 5,
        "rate": 38.5
      },
      {
        "Department": "Human Resources",
        "JobRole": "Manager",
        "OverTime": "No",
        "headcount": 7,
        "leavers": 0,
        "rate": 0.0
      },
      {
        "Department": "Human Resources",
        "JobRole": "Manager",
        "OverTime": "Yes",
        "headcount": 4,
        "leavers": 0,
        "rate": 0.0
      },
      {
        "Department": "Research & Development",
        "JobRole": "Healthcare Representative",
        "OverTime": "No",
        "headcount": 94,
        "leavers": 7,
        "rate": 7.4
      },
      {
        "Department": "Research & Development",
        "JobRole": "Healthcare Representative",
        "OverTime": "Yes",
        "headcount": 37,
        "leavers": 2,
        "rate": 5.4
      },
      {
        "Department": "Research & Development",
        "JobRole": "Laboratory Technician",
        "OverTime": "No",
        "headcount": 197,
        "leavers": 31,
        "rate": 15.7
      },
      {
        "Department": "Research & Development",
        "JobRole": "Laboratory Technician",
        "OverTime": "Yes",
        "headcount": 62,
        "leavers": 31,
        "rate": 50.0
      },
      {
        "Department": "Research & Development",
        "JobRole": "Manager",
        "OverTime": "No",
        "headcount": 41,
        "leavers": 0,
        "rate": 0.0
      },
      {
        "Department": "Research & Development",
        "JobRole": "Manager",
        "OverTime": "Yes",
        "headcount": 13,
        "leavers": 3,
        "rate": 23.1
      },
      {
        "Department": "Research & Development",
        "JobRole": "Manufacturing Director",
        "OverTime": "No",
        "headcount": 106,
        "leavers": 6,
        "rate": 5.7
      },
      {
        "Department": "Research & Development",
        "JobRole": "Manufacturing Director",
        "OverTime": "Yes",
        "headcount": 39,
        "leavers": 4,
        "rate": 10.3
      },
      {
        "Department": "Research & Development",
        "JobRole": "Research Director",
        "OverTime": "No",
        "headcount": 57,
        "leavers": 1,
        "rate": 1.8
      },
      {
        "Department": "Research & Development",
        "JobRole": "Research Director",
        "OverTime": "Yes",
        "headcount": 23,
        "leavers": 1,
        "rate": 4.3
      },
      {
        "Department": "Research & Development",
        "JobRole": "Research Scientist",
        "OverTime": "No",
        "headcount": 195,
        "leavers": 14,
        "rate": 7.2
      },
      {
        "Department": "Research & Development",
        "JobRole": "Research Scientist",
        "OverTime": "Yes",
        "headcount": 97,
        "leavers": 33,
        "rate": 34.0
      },
      {
        "Department": "Sales",
        "JobRole": "Manager",
        "OverTime": "No",
        "headcount": 27,
        "leavers": 1,
        "rate": 3.7
      },
      {
        "Department": "Sales",
        "JobRole": "Manager",
        "OverTime": "Yes",
        "headcount": 10,
        "leavers": 1,
        "rate": 10.0
      },
      {
        "Department": "Sales",
        "JobRole": "Sales Executive",
        "OverTime": "No",
        "headcount": 232,
        "leavers": 26,
        "rate": 11.2
      },
      {
        "Department": "Sales",
        "JobRole": "Sales Executive",
        "OverTime": "Yes",
        "headcount": 94,
        "leavers": 31,
        "rate": 33.0
      },
      {
        "Department": "Sales",
        "JobRole": "Sales Representative",
        "OverTime": "No",
        "headcount": 59,
        "leavers": 17,
        "rate": 28.8
      },
      {
        "Department": "Sales",
        "JobRole": "Sales Representative",
        "OverTime": "Yes",
        "headcount": 24,
        "leavers": 16,
        "rate": 66.7
      }
    ]
  },
  "model": [
    {
      "label": "Logistic Regression",
      "accuracy": 72,
      "recall": 56,
      "f1": 48
    },
    {
      "label": "Random Forest",
      "accuracy": 86,
      "recall": 21,
      "f1": 28
    }
  ],
  "notes": [
    "Rates are descriptive observations from the IBM HR Analytics sample, not causal estimates.",
    "Model metrics are the repository-reported test-set results from the 80/20 split with balanced class weights.",
    "The repository notes that exit interview text, manager notes, or engagement survey scores would help explain why employees leave."
  ]
};
