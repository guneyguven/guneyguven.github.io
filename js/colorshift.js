<!--colorshifter-->
<div>
  <input type="checkbox" class="checkbox" id="chk" />
  <label class="label" for="chk">
    <i class="fa-solid fa-sun"></i>
    <i class="fa-solid fa-moon"></i>
    <div class="ball"></div>
  </label>
</div>

<script type="text/javascript">
  const chk = document.getElementById('chk');
  
  chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });
  </script>
<!--colorshifter-->