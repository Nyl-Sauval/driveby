<?php
namespace App\Http\Controllers\Api;


use App\Models\Agency;
use App\Models\Category;
use Illuminate\Routing\Controller;


class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

}
