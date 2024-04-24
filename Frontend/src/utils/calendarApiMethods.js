import { useDispatch } from 'react-redux';
import { useGetCalendarDatesMutation } from '../slices/calendarApiSlice';
import { setcalendarDates } from '../slices/calendarSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const renameIdField = (data) => {
    return data.map(({ _id, ...rest }) => ({
      id: _id,
      ...rest
    }));
  };

const useFetchCalendarData = () => {
  const dispatch = useDispatch();
  const [getCalendarDates, { isLoading }] = useGetCalendarDatesMutation();

  const fetchCalendarData = async () => {
    try {
      const response = await getCalendarDates().unwrap();
      dispatch(setcalendarDates(renameIdField(response)));
    } catch (error) {
      toast.error('An error occurred. Please try to refresh.');
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  return { isLoading };
};

export default useFetchCalendarData;
