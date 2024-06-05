export default function (el, binding) {
    el.style.position = 'absolute';
    Object.keys(binding.value).forEach((key) => {
      el.style[key] = binding.value[key];
    });
};
