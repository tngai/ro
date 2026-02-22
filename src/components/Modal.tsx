import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <Button onClick={onClose} color="inherit" size="small">
          Close
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}
