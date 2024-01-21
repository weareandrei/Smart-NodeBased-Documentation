// import { icon } from '@/components/ui/Icon';
// import { icons } from 'lucide-react';
import { useMemo } from 'react';
// import * as Dropdown from '@radix-ui/react-dropdown-menu';
// import { Toolbar } from '@/components/ui/Toolbar';
// import { Surface } from '@/components/ui/Surface';
// import { DropdownButton, DropdownCategoryTitle } from '@/components/ui/Dropdown';

export const ContentTypePickerOption = {
  label: '',
  id: '',
  type: 'option',
  disabled: () => false,
  isActive: () => false,
  onClick: () => {},
  icon: '',
};

export const ContentTypePickerCategory = {
  label: '',
  id: '',
  type: 'category',
};

export const ContentPickerOptions = [];

export const ContentTypePicker = ({ options }) => {
  const activeItem = useMemo(() => options.find(option => option.type === 'option' && option.isActive()), [
    options,
  ]);

  return (
      <div></div>
      // <Dropdown.Root>
      //   <Dropdown.Trigger asChild>
      //     <Toolbar.Button active={activeItem?.id !== 'paragraph' && !!activeItem?.type}>
      //       <Icon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} />
      //       <Icon name="ChevronDown" className="w-2 h-2" />
      //     </Toolbar.Button>
      //   </Dropdown.Trigger>
      //   <Dropdown.Content asChild>
      //     <Surface className="flex flex-col gap-1 px-2 py-4">
      //       {options.map(option => {
      //         if (option.type === 'option') {
      //           return (
      //               <DropdownButton key={option.id} onClick={option.onClick} isActive={option.isActive()}>
      //                 <Icon name={option.icon} className="w-4 h-4 mr-1" />
      //                 {option.label}
      //               </DropdownButton>
      //           );
      //         } else if (option.type === 'category') {
      //           return (
      //               <div className="mt-2 first:mt-0" key={option.id}>
      //                 <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
      //               </div>
      //           );
      //         }
      //       })}
      //     </Surface>
      //   </Dropdown.Content>
      // </Dropdown.Root>
  );
};
