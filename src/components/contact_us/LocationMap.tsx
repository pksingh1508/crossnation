import React from "react";

export function LocationMap() {
  return (
    <div className="w-full h-96 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.1234567890123!2d21.0122287!3d52.2296756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3f!2sLudwika%20Idzikowskiego%2016%2C%2000-710%20Warszawa%2C%20Poland!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location - Ludwika Idzikowskiego 16, Warsaw, Poland"
      />
    </div>
  );
}
