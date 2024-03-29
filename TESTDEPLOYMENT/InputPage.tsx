// InputPage.tsx
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, FormHelperText, Grid } from '@mui/material';
import { UserData } from './ColumnPage';

interface InputPageProps {
  onSubmit: (data: { title: string; description: string; status: string }) => void;
  onNext: () => void;
  editItem?: UserData | null; // Add this prop
}

interface FormInputs {
  title: string;
  description: string;
  status: string;
}

const InputPage: React.FC<InputPageProps> = ({ onSubmit, onNext, editItem }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  React.useEffect(() => {
    if (editItem) {
      setValue('title', editItem.title);
      setValue('description', editItem.description);
      setValue('status', editItem.status);
    }
  }, [editItem, setValue]);

  const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
    // Call the parent onSubmit function if validation passes
    onSubmit(data);
    // Move to the next page
    onNext();
  };

return (
  <form onSubmit={handleSubmit(handleFormSubmit)}>
    {editItem && (
      <>
        <TextField
        label="Title"
        fullWidth
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
      />
      {errors.title && (
        <FormHelperText error>
          {errors.title.message}
        </FormHelperText>
      )}
        <TextField
        label="Description"
        fullWidth
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
      />
       {errors.description && (
        <FormHelperText error>
          {errors.description.message}
        </FormHelperText>
      )}
        <TextField
        label="Status"
        fullWidth
        {...register('status', { required: 'Status is required' })}
        error={!!errors.status}
      />
       {errors.status && (
        <FormHelperText error>
          {errors.status.message}
        </FormHelperText>
      )}
        {/* ... add more fields with editItem values */}
      </>
    )}
    {!editItem && (
      <>
       <TextField
        label="Title"
        fullWidth
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
      />
      {errors.title && (
        <FormHelperText error>
          {errors.title.message}
        </FormHelperText>
      )}

       <TextField
        label="Description"
        fullWidth
        {...register('description', { required: 'Description is required' })}
        error={!!errors.description}
      />
       {errors.description && (
        <FormHelperText error>
          {errors.description.message}
        </FormHelperText>
      )}

          <TextField
        label="Status"
        fullWidth
        {...register('status', { required: 'Status is required' })}
        error={!!errors.status}
      />
       {errors.status && (
        <FormHelperText error>
          {errors.status.message}
        </FormHelperText>
      )}
        {/* ... add more empty fields */}
      </>
    )}
     <Grid container spacing={2}>

<Grid item>
    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
     Next
 </Button>
 </Grid>
</Grid>
  </form>
);
}

export default InputPage;