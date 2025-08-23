import AuthLayout from '@/sections/auth/AuthLayout';
import CodeVerificationForm from '@/view/authentication/CodeVerificationForm';

// ================================|| VERIFY OTP ||================================ //

const CodeVerificationPage = () => <AuthLayout content={<CodeVerificationForm />} />;

export default CodeVerificationPage;
