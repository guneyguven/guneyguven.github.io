<?php
//Source folder where all images are placed
$source="img/portfolio";

//Destination folder where all images with watermark will be copied
$destination="img/portfolio_w";

//Creating an image object of watermark image
$watermark=imagecreatefrompng("/watermark.png");

//Margin of watermark from right and bottom of the main image
$margin_right=10;
$margin_bottom=10;

//Height ($sy) and Width ($sx) of watermark image
$sx=imagesx($watermark);
$sy=imagesy($watermark);

//Get list of images in source folder
$images=array_diff(scandir($source), array('..', '.'));

foreach($images as $image){
  //Create image object of main image
  $img=imagecreatefromjpeg($source.'/'.$image);

  //Copying watermark image into the main image
  imagecopy($img, $watermark, imagesx($img) - $sx - $margin_right, imagesy($img) - $sy - $margin_bottom, 0, 0, $sx, $sy);

  //Saving the merged image into the destination folder
  imagejpeg($img, $destination.'/'.$image,100);

  //Destroying the main image object
  imagedestroy($img);
}

//Destroying watermark image object
imagedestroy($watermark);