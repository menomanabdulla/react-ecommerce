import React from 'react';
export const EllipsisIcon = ({
   color = 'currentColor',
   width = '18px',
   height = '18px',
 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 26 6'
    >
      <g data-name='Group 152' transform='translate(589 479)'>
        <ellipse
          data-name='Ellipse 20'
          cx='3.136'
          cy='3'
          rx='3.136'
          ry='3'
          transform='translate(-589 -479)'
          fill={color}
        />
        <ellipse
          data-name='Ellipse 22'
          cx='3.136'
          cy='3'
          rx='3.136'
          ry='3'
          transform='translate(-569.271 -479)'
          fill={color}
        />
        <ellipse
          data-name='Ellipse 21'
          cx='3.136'
          cy='3'
          rx='3.136'
          ry='3'
          transform='translate(-579.136 -479)'
          fill={color}
        />
      </g>
    </svg>
  );
};
