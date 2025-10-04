import React from "react";

export function LocationMap() {
  return (
    <div className="w-full h-96 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.926033697807!2d20.9923064!3d52.233202399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd9bd5501479%3A0xfe6ebbe174616cb0!2sMennica%20Legacy%20Tower!5e1!3m2!1sen!2sin!4v1759570646360!5m2!1sen!2sin"
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
