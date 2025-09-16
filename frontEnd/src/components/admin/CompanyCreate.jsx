import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();
  const registernewCompany = async () => {
  
  // if (!companyName.trim()) {
  //   toast.error("Company name is required");
  //   return;
  // }
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
         { companyName }, // { companyName },
        {
          headers: {
            'Content-type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Comapny Name</h1>
          <p className="text-gray-500">
            What would you like to give your company Name ? you can change this later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt ,Google etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button className="bg-[#0d0606] text-[#ffff] cursor-pointer" onClick={registernewCompany}>
            Continue
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
