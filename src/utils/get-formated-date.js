"use strict";

exports.getFormatedDate = () =>
  new Date().toLocaleString(`ru-RU`).replace(`.`, `-`).replace(`,`, ``);
