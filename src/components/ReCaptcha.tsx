
import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Using a public test key for development - replace with your actual key in production
const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onChange }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    // Reset captcha when component mounts
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, []);

  const handleChange = (token: string | null) => {
    console.log('CAPTCHA token received:', token ? 'Token present' : 'No token');
    onChange(token);
  };

  return (
    <div className="my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={handleChange}
        size="normal"
      />
    </div>
  );
};

export default ReCaptcha;
