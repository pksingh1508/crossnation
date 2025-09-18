import React from "react";

export function LocationMap() {
  return (
    <div className="w-full h-96 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2443.853819689377!2d21.021782876663426!3d52.22787357198607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDEzJzQwLjMiTiAyMcKwMDEnMjcuNyJF!5e0!3m2!1sen!2sin!4v1744210054257!5m2!1sen!2sin"
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
