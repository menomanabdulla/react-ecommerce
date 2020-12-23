import React from 'react';
export const CloseIcon = ({
  color = 'currentColor',
  width = '18px',
  height = '18px',
}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg'
         viewBox='0 0 10.003 10'
         width={width}
         height={height}
    >
      <path
        data-name='_ionicons_svg_ios-close (5)'
        d='M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z'
        transform='translate(-160.5 -160.55)'
        fill={color}
      />
    </svg>
  );
};
