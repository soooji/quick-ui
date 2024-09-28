export interface DropdownInterface {
  isOpen: boolean;
  open: boolean;
  disabled: boolean;
  readonly: boolean;
  keepOpenOnSelect: boolean;
  toggle: () => void;
  close: () => void;
  _openDropdown: () => void;
  _closeDropdown: () => void;
  _toggleDropdown: () => void;
}