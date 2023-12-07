import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

interface Department {
  id: number;
  name: string;
  sub_departments: SubDepartment[];
    selected?: boolean;
    plus_clicked?: boolean;
}

interface SubDepartment {
  id: number;
  name: string;
    selected?: boolean;

}

const hardcodedDepartments: Department[] = [
  {
    id: 1,
    name: 'Customer_service',
     plus_clicked:false,
    sub_departments: [
      {
        id: 1,
        name: 'Support',
        selected: false,
      },
      {
        id: 2,
        name: 'Customer success',
        selected: false,
      },
    ],
    selected:false,
  },
  {
    id: 2,
    name: 'Design',
    plus_clicked:false,
    sub_departments: [
      {
        id: 3,
        name: 'Graphics Design',
        selected: false,
      },
      {
        id: 4,
        name: 'Product design',
        selected: false,
      },
      {
        id: 5,
        name: 'Web design',
        selected: false,
      },
    ],
    selected:false,
  },
];

const Component2 = () => {
    const [expanded, setExpanded] = useState<number[]>([]);
    const handleDepartmentExpand = (departmentIndex:number) => {
        setExpanded((prev) => [...prev, departmentIndex]);
      };
    
      const handleDepartmentCollapse = (departmentIndex:number) => {
        setExpanded((prev) => prev.filter((index) => index !== departmentIndex));
      };
  const [departments, setDepartments] = useState<Department[]>(hardcodedDepartments);

  const handleSubDepartmentToggle = (departmentIndex: number, subDepartmentIndex: number) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].sub_departments[subDepartmentIndex].selected = !updatedDepartments[departmentIndex].sub_departments[subDepartmentIndex].selected;

    // If all sub departments are selected, select parent department as well
    if (updatedDepartments[departmentIndex].sub_departments.every((subDepartment) => subDepartment.selected)) {
      updatedDepartments[departmentIndex].selected = true;
    } else {
      updatedDepartments[departmentIndex].selected = false;
    }

    setDepartments(updatedDepartments);
  };

  const handleDepartmentToggle = (departmentIndex: number) => {
    const updatedDepartments = [...departments];
    updatedDepartments[departmentIndex].selected = !updatedDepartments[departmentIndex].selected;

    // Select/deselect all sub departments
    updatedDepartments[departmentIndex].sub_departments.forEach((subDepartment) => {
      subDepartment.selected = updatedDepartments[departmentIndex].selected;
    });

    setDepartments(updatedDepartments);
  };

  return (
    <List>
      {departments.map((department, departmentIndex) => (
        <React.Fragment key={department.id}>
          <ListItem sx={{ pl: 4 }} className="department-item">
            <ControlPointIcon
              onClick={() => {
                if (expanded.includes(departmentIndex)) {
                  handleDepartmentCollapse(departmentIndex);
                } else {
                  handleDepartmentExpand(departmentIndex);
                }
              }}
              className="department-expand-icon"
            />
            <Checkbox
              checked={department.selected}
              onChange={() => handleDepartmentToggle(departmentIndex)}
              className="department-checkbox"
            />
            <ListItemText
              primary={department.name}
              className="department-name"
            />
          </ListItem>
          <Collapse in={expanded.includes(departmentIndex)}>
            {department.sub_departments.map((subDepartment, subDepartmentIndex) => (
              <ListItem
                key={subDepartment.id}
                sx={{ pl: 8 }}
                className="sub-department-item"
              >
                <Checkbox
                  checked={subDepartment.selected}
                  onChange={() =>
                    handleSubDepartmentToggle(departmentIndex, subDepartmentIndex)
                  }
                  className="sub-department-checkbox"
                />
                <ListItemText
                  primary={subDepartment.name}
                  className="sub-department-name"
                />
              </ListItem>
            ))}
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Component2;
