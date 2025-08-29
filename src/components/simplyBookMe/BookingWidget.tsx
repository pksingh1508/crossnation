"use client";
import React, { useEffect, useRef } from "react";

function BookingWidget() {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script is already added
    if (!document.querySelector("#simplybook-widget-script")) {
      const script = document.createElement("script");
      script.id = "simplybook-widget-script";
      script.async = true;
      script.src = "//widget.simplybook.me/v2/widget/widget.js";

      script.onload = () => {
        if (window.SimplybookWidget) {
          new window.SimplybookWidget({
            widget_type: "iframe",
            url: "https://crossnation.simplybook.me",
            theme: "adacompliant",
            theme_settings: {
              timeline_hide_unavailable: "1",
              hide_past_days: "0",
              timeline_show_end_time: "0",
              timeline_modern_display: "as_slots",
              display_item_mode: "block",
              sb_review_image: "",
              hide_img_mode: "0",
              show_sidebar: "1",
            },
            timeline: "modern",
            datepicker: "top_calendar",
            is_rtl: false,
            app_config: {
              clear_session: 0,
              predefined: [],
              allow_switch_to_ada: 0,
            },
            container_id: "sbw_alym20",
          });
        }
      };

      document.body.appendChild(script);
    } else {
      // If script already loaded, just init widget
      if (window.SimplybookWidget) {
        new window.SimplybookWidget({
          widget_type: "iframe",
          url: "https://crossnation.simplybook.me",
          theme: "adacompliant",
          container_id: "sbw_alym20",
        });
      }
    }
  }, []);

  return <div id="sbw_alym20" ref={widgetContainerRef}></div>;
}

export default BookingWidget;
