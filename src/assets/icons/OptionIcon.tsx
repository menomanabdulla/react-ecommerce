import React from 'react';
export const OptionIcon = ({
 color = 'currentColor',
 width = '18px',
 height = '18px',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 3.5 14'
    >
      <path
        data-name='_ionicons_svg_md-more (1)'
        d='M219.5,97.75a1.75,1.75,0,1,0-1.75,1.75A1.755,1.755,0,0,0,219.5,97.75Zm0,10.5a1.75,1.75,0,1,0-1.75,1.75A1.755,1.755,0,0,0,219.5,108.25Zm0-5.25a1.75,1.75,0,1,0-1.75,1.75A1.755,1.755,0,0,0,219.5,103Z'
        transform='translate(-216 -96)'
        fill={color}
      />
    </svg>
  );
};
